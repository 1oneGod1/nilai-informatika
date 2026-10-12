// Run before publishing after editing grade9-vr/data.js or grade9-vr/app.js.
// Content fingerprints prevent shared CDN caches from mixing old data and new UI.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const folder=new URL('../grade9-vr/',import.meta.url);
const entry=new URL('index.html',folder);
let html=await fs.readFile(entry,'utf8');
for(const name of ['data','app']){
  const contents=await fs.readFile(new URL(name+'.js',folder));
  const hash=createHash('sha256').update(contents).digest('hex').slice(0,12);
  const filename=name+'.'+hash+'.js';
  await fs.writeFile(new URL(filename,folder),contents);
  const pattern=new RegExp('src="'+name+'(?:\\.[a-f0-9]{12})?\\.js(?:\\?[^"\\s]*)?"','g');
  const matches=html.match(pattern)||[];
  if(matches.length!==1)throw Error('Expected one '+name+' script reference.');
  html=html.replace(pattern,'src="'+filename+'"');
  console.log(filename);
}
// Keep earlier fingerprinted files so already-open versions can still load them.
await fs.writeFile(entry,html);
