// Publish content-addressed assets so cached Render/Firebase pages cannot mix releases.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),folder=new URL('grade12-sustainable/',root);
const fingerprint=bytes=>createHash('sha256').update(bytes).digest('hex').slice(0,12);
let html=await fs.readFile(new URL('index.html',folder),'utf8');
for(const base of ['data.js','sources.js','audit.js','access.js','app.js','style.css']){
  const bytes=await fs.readFile(new URL(base,folder)),[name,ext]=base.split('.'),filename=name+'.'+fingerprint(bytes)+'.'+ext;
  await fs.writeFile(new URL(filename,folder),bytes);
  const pattern=new RegExp('("'+name+')(?:\\.[a-f0-9]{12})?\\.'+ext+'(?:\\?[^"\\s]*)?"','g');
  if(!pattern.test(html))throw Error('Missing asset '+base);
  html=html.replace(pattern,'"'+filename+'"');
  console.log(filename);
}
await fs.writeFile(new URL('index.html',folder),html);
for(const [base,page] of [['student','index.html'],['teacher','dashboard.html']]){
  const bytes=await fs.readFile(new URL('js/'+base+'.js',root)),filename=base+'.'+fingerprint(bytes)+'.js';
  await fs.writeFile(new URL('js/'+filename,root),bytes);
  const pageUrl=new URL(page,root);let document=await fs.readFile(pageUrl,'utf8');
  const pattern=new RegExp('src="js/'+base+'(?:\\.[a-f0-9]{12})?\\.js(?:\\?[^"\\s]*)?"');
  if(!pattern.test(document))throw Error('Missing portal script '+base);
  document=document.replace(pattern,'src="js/'+filename+'"');await fs.writeFile(pageUrl,document);
  console.log('js/'+filename);
}
