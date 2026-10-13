// Run before publishing after editing grade9-vr/data.js or grade9-vr/app.js.
// Content fingerprints prevent shared CDN caches from mixing old data and new UI.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const folder=new URL('../grade9-vr/',import.meta.url);
const entry=new URL('index.html',folder);
let html=await fs.readFile(entry,'utf8');
const assets={id:{},en:{}};
for(const name of ['data','app','access','data-en','app-en','access-en']){
  const contents=await fs.readFile(new URL(name+'.js',folder));
  const hash=createHash('sha256').update(contents).digest('hex').slice(0,12);
  const filename=name+'.'+hash+'.js';
  await fs.writeFile(new URL(filename,folder),contents);
  assets[name.endsWith('-en')?'en':'id'][name.replace('-en','')]=filename;
  console.log(filename);
}
const bootstrap=(await fs.readFile(new URL('language.js',folder),'utf8')).replace('__VR_ASSET_MANIFEST__',JSON.stringify(assets));
const bootName='language.'+createHash('sha256').update(bootstrap).digest('hex').slice(0,12)+'.js';
await fs.writeFile(new URL(bootName,folder),bootstrap);
const bootPattern=/<script defer src="language\.[a-f0-9]{12}\.js"><\/script>/;
if(bootPattern.test(html))html=html.replace(bootPattern,'<script defer src="'+bootName+'"></script>');
else{
 const old=/<script defer src="data\.[a-f0-9]{12}\.js"><\/script><script defer src="access\.js[^\"]*"><\/script><script defer src="app\.[a-f0-9]{12}\.js"><\/script>/;
 if(!old.test(html))throw Error('Missing language entry point.');
 html=html.replace(old,'<script defer src="'+bootName+'"></script>');
}
console.log(bootName);
const classroom=await fs.readFile(new URL('classroom.css',folder));
const cssName='classroom.'+createHash('sha256').update(classroom).digest('hex').slice(0,12)+'.css';
await fs.writeFile(new URL(cssName,folder),classroom);
if(/<link rel="stylesheet" href="classroom(?:\.[a-f0-9]{12})?\.css">/.test(html))html=html.replace(/<link rel="stylesheet" href="classroom(?:\.[a-f0-9]{12})?\.css">/,'<link rel="stylesheet" href="'+cssName+'">');
else html=html.replace('</head>','  <link rel="stylesheet" href="'+cssName+'">\n</head>');
console.log(cssName);
// Keep earlier fingerprinted files so already-open versions can still load them.
await fs.writeFile(entry,html);
