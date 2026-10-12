import fs from 'node:fs/promises';
const folder=new URL('../grade9-vr/',import.meta.url);
const dictionary=JSON.parse(await fs.readFile(new URL('english-ui.json',import.meta.url),'utf8'));
const keys=Object.keys(dictionary).sort((a,b)=>b.length-a.length);
const pattern=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
for(const name of ['app','access']){
 const source=await fs.readFile(new URL(name+'.js',folder),'utf8');
 const translated=source.replace(pattern,match=>dictionary[match]).replaceAll("toLocaleLowerCase('id')","toLocaleLowerCase('en')").replaceAll("toLocaleString('id')","toLocaleString('en')");
 await fs.writeFile(new URL(name+'-en.js',folder),'// Generated from '+name+'.js and scripts/english-ui.json.\n'+translated);
}
console.log('Prepared English interface and access messages.');
