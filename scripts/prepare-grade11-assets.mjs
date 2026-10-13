import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const folder=new URL('../grade11-ai/',import.meta.url);let html=await fs.readFile(new URL('index.html',folder),'utf8');
for(const base of ['data.js','access.js','app.js','style.css']){const bytes=await fs.readFile(new URL(base,folder));const [name,ext]=base.split('.'),file=name+'.'+createHash('sha256').update(bytes).digest('hex').slice(0,12)+'.'+ext;await fs.writeFile(new URL(file,folder),bytes);const regex=new RegExp('("'+name+')(?:\\.[a-f0-9]{12})?\\.'+ext+'(?:\\?[^"\\s]*)?"','g');if(!regex.test(html))throw Error('Missing '+base);html=html.replace(regex,'"'+file+'"');console.log(file);}
await fs.writeFile(new URL('index.html',folder),html);
