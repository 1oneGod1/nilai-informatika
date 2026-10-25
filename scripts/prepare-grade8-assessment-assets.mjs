import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
for(const path of ['js/grade8-cloud-identity.js','js/grade8-submissions.js','js/grade8-game-assessment.js','js/student.js','js/teacher.js','js/teacher-assessment.js']){
 const bytes=await fs.readFile(new URL(path,root)),file=path.replace('.js','.'+createHash('sha256').update(bytes).digest('hex').slice(0,12)+'.js');await fs.writeFile(new URL(file,root),bytes);
 const name=path.slice(0,-3);
 for(const page of ['index.html','dashboard.html','grade8-games/index.html']){let html=await fs.readFile(new URL(page,root),'utf8'),prefix=page.includes('/')?'../':'';
  if(path.includes('grade8-cloud-identity')&&!html.includes('js/grade8-cloud-identity'))html=html.replace(/(<script[^>]*src="(?:\.\.\/)?js\/firebase-init[^\"]*"><\/script>)/,'$1\n    <script '+(prefix?'defer ':'')+'src="'+prefix+path+'"></script>');
  if(page==='dashboard.html'&&path.includes('grade8-submissions')&&!html.includes('js/grade8-submissions'))html=html.replace(/(<script src="js\/grade8-game-assessment[^\"]*"><\/script>)/,'$1\n    <script src="'+path+'"></script>');
  const pattern=new RegExp('src="'+prefix.replaceAll('.','\\.')+name+'(?:\\.[a-f0-9]{12})?\\.js(?:\\?[^"\\s]*)?"','g');html=html.replace(pattern,'src="'+prefix+file+'"');await fs.writeFile(new URL(page,root),html);
 }
 console.log(file);
}
