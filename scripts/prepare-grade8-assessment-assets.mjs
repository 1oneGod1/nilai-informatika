import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),pages=['index.html','dashboard.html'];
for(const path of ['js/grade8-game-assessment.js','js/teacher-assessment.js']){
 const bytes=await fs.readFile(new URL(path,root)),file=path.replace('.js','.'+createHash('sha256').update(bytes).digest('hex').slice(0,12)+'.js');
 await fs.writeFile(new URL(file,root),bytes);
 const name=path.slice(0,-3),pattern=new RegExp('src="'+name+'(?:\\.[a-f0-9]{12})?\\.js(?:\\?[^"\\s]*)?"','g');
 for(const page of pages){let html=await fs.readFile(new URL(page,root),'utf8');
  if(path.includes('grade8-game-assessment')&&!html.includes('js/grade8-game-assessment'))html=html.replace(/(<script src="js\/grade11-ai-assessment[^\"]*"><\/script>)/,'$1\n    <script src="js/grade8-game-assessment.js"></script>');
  html=html.replace(pattern,'src="'+file+'"');await fs.writeFile(new URL(page,root),html);
 }
 console.log(file);
}
