// Publish content-addressed copies of the Grade 9 VR submission scripts used by
// the portal (index.html) and teacher dashboard (dashboard.html).
// Run after editing js/grade9-cloud-identity.js or js/grade9-vr-submissions.js
// (and run prepare-grade9-assets.mjs for the VR Studio copy of the identity file).
import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const targets={'js/grade9-cloud-identity.js':['index.html','dashboard.html'],'js/grade9-vr-submissions.js':['dashboard.html']};
for(const [path,pages] of Object.entries(targets)){
 const bytes=await fs.readFile(new URL(path,root)),file=path.replace(/\.js$/,'.'+createHash('sha256').update(bytes).digest('hex').slice(0,12)+'.js');
 await fs.writeFile(new URL(file,root),bytes);
 for(const page of pages){
  let html=await fs.readFile(new URL(page,root),'utf8');
  const pattern=new RegExp('src="'+path.slice(0,-3).replaceAll('/','\\/')+'(?:\\.[a-f0-9]{12})?\\.js(?:\\?[^"\\s]*)?"','g');
  if(!pattern.test(html))throw Error('Missing '+path+' in '+page);
  html=html.replace(pattern,'src="'+file+'"');await fs.writeFile(new URL(page,root),html);
 }
 console.log(file);
}
