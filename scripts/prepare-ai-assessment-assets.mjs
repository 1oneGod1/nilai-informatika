import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const assets=['js/assessment-config.js','js/grade11-ai-assessment.js','js/teacher-assessment.js','grade11-ai/assessment.css'];
const files=new Map();
for(const path of assets){const bytes=await fs.readFile(new URL(path,root)),hash=createHash('sha256').update(bytes).digest('hex').slice(0,12),file=path.replace(/\.(js|css)$/,'.'+hash+'.$1');await fs.writeFile(new URL(file,root),bytes);files.set(path,file);console.log(file);}
for(const page of ['index.html','dashboard.html']){let html=await fs.readFile(new URL(page,root),'utf8');if(!html.includes('grade11-ai/assessment.'))html=html.replace('</head>','<link rel="stylesheet" href="grade11-ai/assessment.css">\n</head>');for(const [path,file]of files){const [name,ext]=path.split(/\.(?=[^.]+$)/),pattern=new RegExp('"'+name.replaceAll('/','\\/')+'(?:\\.[a-f0-9]{12})?\\.'+ext+'(?:\\?[^"\\s]*)?"','g');html=html.replace(pattern,'"'+file+'"');}await fs.writeFile(new URL(page,root),html);}
