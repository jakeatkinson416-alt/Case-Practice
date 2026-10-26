import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const assets = {'/':'index.html','/index.html':'index.html','/app.js':'app.js','/structure-quiz.js':'structure-quiz.js','/data.js':'data.js','/style.css':'style.css'};
const types = {html:'text/html',js:'text/javascript',css:'text/css'};
http.createServer(async(req,res)=>{const file=assets[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);return res.end('Not found');}try{const body=await readFile(fileURLToPath(new URL(file,import.meta.url)));res.writeHead(200,{'Content-Type':types[file.split('.').pop()]+'; charset=utf-8'});res.end(body);}catch{res.writeHead(500);res.end('Unable to load asset');}}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Case Practice running on port '+(process.env.PORT||3000)));
