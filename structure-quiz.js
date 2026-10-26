import {frameworks} from './data.js';

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function gradeSelection(selected, correct) {
  const actual = new Set(selected);
  return actual.size === correct.length && correct.every(answer => actual.has(answer));
}

function optionsFor(labels, correctLabels) {
  const options = shuffle(labels);
  return {options, correct: correctLabels.map(label => options.indexOf(label))};
}

export function buildStructureQuestions(topic = 'all') {
  const selected = topic === 'all' ? frameworks : [frameworks[Number(topic)]];
  if (selected.some(f => !f)) throw new Error('Unknown framework');
  return selected.flatMap(f => {
    const names = f.branches.map(([title]) => title);
    const otherNames = [...new Set(frameworks.filter(other => other !== f)
      .flatMap(other => other.branches.map(([title]) => title)))].filter(title => !names.includes(title));
    const recall = {
      id: `${f.name}:recall`, framework: f.name, kind: 'recall',
      prompt: `Select the FOUR top-level buckets for ${f.name.toLowerCase()} in your cheat sheet.`,
      context: f.question,
      ...optionsFor([...names, ...shuffle(otherNames).slice(0, 4)], names),
      explanation: `The four buckets are: ${names.join(' → ')}. These labels follow your cheat sheet; in a live case, adapt the structure to the objective.`
    };
    const missing = f.branches.map(([title, items], index) => ({
      id: `${f.name}:missing:${index}`, framework: f.name, kind: 'missing',
      prompt: 'Which fourth bucket is missing from this structure?',
      context: names.filter((_, i) => i !== index).join(' → ') + ' → ?',
      ...optionsFor([title, ...shuffle(otherNames).slice(0, 3)], [title]),
      explanation: `${title} completes the cheat-sheet structure. It covers ${items.join('; ')}.`
    }));
    const sorting = f.branches.map(([title, items], index) => ({
      id: `${f.name}:sort:${index}`, framework: f.name, kind: 'sort',
      prompt: 'Which bucket do these details belong in?',
      context: items.join(' • '),
      ...optionsFor(names, [title]),
      explanation: `In your ${f.name.toLowerCase()} cheat sheet, these details belong under ${title}. ${items.join('; ')}.`
    }));
    return [recall, ...missing, ...sorting];
  });
}

export function createStructureTest(topic = 'all', format = 'mixed') {
  const pool = buildStructureQuestions(topic);
  const filtered = format === 'recall' ? pool.filter(q => q.kind !== 'sort')
    : format === 'sort' ? pool.filter(q => q.kind === 'sort') : pool;
  // Mixed tests cover every selected subject and all three learning tasks.
  if (format === 'mixed') {
    return shuffle([...new Set(filtered.map(q => q.framework))].flatMap(name => {
      const subject = filtered.filter(q => q.framework === name);
      return ['recall', 'missing', 'sort'].map(kind => shuffle(subject.filter(q => q.kind === kind))[0]);
    }));
  }
  return shuffle(filtered);
}
