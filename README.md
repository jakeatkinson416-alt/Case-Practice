# Case Practice · Interview Lab

A standalone Quizlet-style consulting interview study app for a two-week BCG Associate preparation sprint. Independent educational material; not affiliated with or endorsed by BCG. Ten image-based frameworks and twelve representative practice archetypes are not a verified frequency ranking or a prediction of interview questions. Numerical examples are fictional. The Framework cheat sheet transcribes and paraphrases the user-supplied picture. Its ten categories are integrated into flashcards and speed drills. Case practice retains the original extra topics as well.

## Run

Requires Node.js 20 or later. No external packages, API keys, database, or installation required.

```sh
npm start
```

The server listens on port 3000 (`PORT` overrides it). Open the server in your normal local development browser. Run `npm test` for content consistency checks. The static assets are ready for GitHub Pages. In repository Settings → Pages, choose Deploy from a branch, select main and / (root), and save. The site will be at https://jakeatkinson416-alt.github.io/Case-Practice/ after GitHub completes deployment. No build step is required.

## Study modes

- Framework cheat sheet: profit improvement, revenue growth, market entry, cost cutting, process optimization, product launch, M&A, investment decisions, competitive threat and pricing; all four branches and supporting details from the picture, with clarification of context-dependent cost classification.


- 94 flashcards: structures, pitfalls, math and interviewing fundamentals; mark known or review weak cards.
- Randomized 10-question tests with immediate explanations and a final score, drawn from 18 questions.
- Twelve case prompts with locally saved blank-page answers, coaching, suggested structures, quantitative follow-ups and worked answers. Self-assessment rubric; free-text answers are not automatically graded.
- Twenty-two speed drills with 30/60/90-second timers and suggested answers.
- Fourteen-day plan with completion tracking, realistic mock interviews and fit-story practice.

Practice archetypes: profitability, market entry, growth, pricing, market sizing, M&A, operations, investment, competitive response, turnaround, cost cutting and product launch. Existing saved card indices and case notes are preserved. Adapt structures to the client; do not recite a generic tree. Use recruiter instructions for the current interview format and practice full cases with another person when possible.

Progress is stored only in browser local storage. Export notes and progress from the plan screen; there is no import or cloud synchronization. Google Fonts is optional: system fonts work offline. No analytics or credentials are used.

## Development

`data.js` holds the study content; `app.js` implements the study modes; `style.css` controls responsive layout. The Node server only exposes the five public assets, not repository files. This cloud task is already isolated: use the existing checkout; do not create a worktree unless explicitly requested.
