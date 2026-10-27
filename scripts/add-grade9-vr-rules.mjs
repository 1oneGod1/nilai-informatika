// One-off generator: adds Grade 9 VR Studio rules by mirroring the Grade 8 Game Studio rules.
// Usage: node scripts/add-grade9-vr-rules.mjs  (idempotent; rewrites database.rules.json)
import fs from 'node:fs/promises';
const file=new URL('../database.rules.json',import.meta.url);
const rules=JSON.parse(await fs.readFile(file,'utf8'));
const r=rules.rules;
const TEACHER="auth != null && ((auth.token.email === 'andi.purba@sdh.or.id' || auth.token.email === 'pandapotanandi@gmail.com') || (root.child('guru').child(auth.uid).child('isVerified').val() === true && (auth.token.email_verified === true || root.child('guru').child(auth.uid).child('emailVerified').val() === true)))";
const OWNER="(auth != null && root.child('grade9VrAccounts').child($studentId).child('uid').val() === auth.uid && root.child('siswa').child($studentId).child('kelas').val().matches(/^9/))";
const str=(max)=>({'.validate':`newData.isString() && newData.val().length <= ${max}`});
const fields=['projectUrl','evidence','reflection','exitTicket','done'];
const same=fields.concat(['version','requestId','submittedAt','submittedBy']).map(k=>`newData.child('${k}').val() === data.child('${k}').val()`).join(' && ');
function lesson(){return {
  '.write':`${OWNER} && newData.exists()`,
  '.validate':"newData.hasChildren(['projectUrl','evidence','reflection','exitTicket','done','revision','updatedAt','updatedBy']) && (!data.child('submission').exists() || newData.child('submission').exists())",
  projectUrl:str(2000),evidence:str(4000),reflection:str(4000),exitTicket:str(4000),
  done:{'.validate':'newData.isBoolean()'},
  revision:{'.validate':'newData.isNumber() && newData.val() === (data.exists() ? data.val() + 1 : 1)'},
  updatedAt:{'.validate':'newData.val() === now'},
  updatedBy:{'.validate':'newData.val() === auth.uid'},
  submission:{
    '.validate':`newData.hasChildren(['projectUrl','evidence','reflection','exitTicket','done','version','requestId','submittedAt','submittedBy']) && newData.child('projectUrl').val().matches(/^https:\\/\\/.+/) && newData.child('evidence').val().length > 0 && newData.child('reflection').val().length > 0 && ((${same}) || (newData.child('version').val() === (data.exists() ? data.child('version').val() + 1 : 1) && newData.child('requestId').val() !== data.child('requestId').val() && newData.child('submittedAt').val() === now && newData.child('submittedBy').val() === auth.uid))`,
    projectUrl:str(2000),evidence:str(4000),reflection:str(4000),exitTicket:str(4000),
    done:{'.validate':'newData.isBoolean()'},
    version:{'.validate':'newData.isNumber() && newData.val() >= 1'},
    requestId:{'.validate':'newData.isString() && newData.val().length >= 8 && newData.val().length <= 80'},
    submittedAt:{'.validate':'newData.isNumber()'},
    submittedBy:{'.validate':'newData.val() === data.val() || newData.val() === auth.uid'},
    $other:{'.validate':false}},
  $other:{'.validate':false}};}
const lessons={};for(let i=1;i<=9;i++)lessons[String(i)]=lesson();lessons.$other={'.validate':false};
r.learningProgress.$studentId.grade9Vr={
  '.read':`(${TEACHER}) || ${OWNER}`,
  student:{lessons,$other:{'.validate':false}},
  teacher:{reviews:{$lessonId:{
    '.write':TEACHER,
    '.validate':"newData.hasChildren(['message','status','sourceVersion','updatedAt','updatedBy'])",
    message:str(2000),
    status:{'.validate':"newData.val() === 'seen' || newData.val() === 'needs_revision' || newData.val() === 'accepted'"},
    sourceVersion:{'.validate':"newData.isNumber() && newData.val() >= 1 && newData.val() === root.child('learningProgress').child($studentId).child('grade9Vr/student/lessons').child($lessonId).child('submission/version').val()"},
    updatedAt:{'.validate':'newData.val() === now'},
    updatedBy:{'.validate':'newData.val() === auth.uid'},
    $other:{'.validate':false}}},$other:{'.validate':false}},
  $other:{'.validate':false}};
// Enrollment + binding: same structure as grade8Enrollment / grade8GameAccounts.
const g8e=JSON.stringify(r.grade8Enrollment),g8a=JSON.stringify(r.grade8GameAccounts);
const toG9=s=>JSON.parse(s.replaceAll('grade8GameAccounts','grade9VrAccounts').replaceAll('grade8Enrollment','grade9Enrollment').replaceAll('matches(/^8/)','matches(/^9/)').replaceAll('^g8[.]','^g9[.]').replaceAll('newData.val() === 8','newData.val() === 9'));
r.grade9Enrollment=toG9(g8e);r.grade9VrAccounts=toG9(g8a);
// Password: grade 9 bound student may change own password; anonymous writes excluded for grade 9.
const pw=r.siswa.$siswaId.password;
if(!pw['.write'].includes('grade9VrAccounts')){
  if(!pw['.write'].includes("matches(/^(8|11)/)"))throw Error('Unexpected password rule');
  pw['.write']=pw['.write'].replace("matches(/^(8|11)/)","matches(/^(8|9|11)/)")+" || (auth != null && root.child('grade9VrAccounts').child($siswaId).child('uid').val() === auth.uid && root.child('siswa').child($siswaId).child('kelas').val().matches(/^9/))";
}
// Teacher-reviewed VR grade metadata (written together with q2_f1 by the teacher; parent rule already teacher-only).
r.siswa.$siswaId.grade9VrGrades={$field:{
  '.validate':"$field.matches(/^q[1-4]_f[0-9]+$/) && newData.hasChildren(['score','base','daysLate','reviewed','reviewedAt','reviewedBy'])",
  score:{'.validate':'newData.isNumber() && newData.val() >= 0 && newData.val() <= 100'},
  base:{'.validate':'newData.isNumber() && newData.val() >= 0 && newData.val() <= 100'},
  suggested:{'.validate':'newData.isNumber() && newData.val() >= 0 && newData.val() <= 100'},
  daysLate:{'.validate':'newData.isNumber() && newData.val() >= 0'},
  penaltyPerDay:{'.validate':'newData.isNumber() && newData.val() >= 0'},
  kkm:{'.validate':'newData.isNumber() && newData.val() >= 0 && newData.val() <= 100'},
  dueDate:{'.validate':"newData.isString() && newData.val().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)"},
  completedOn:{'.validate':"newData.isString() && newData.val().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)"},
  dateSource:{'.validate':"newData.val() === 'submission' || newData.val() === 'manual'"},
  lessonId:{'.validate':'newData.isNumber() && newData.val() >= 1 && newData.val() <= 9'},
  sourceVersion:{'.validate':'newData.isNumber() && newData.val() >= 0'},
  overridden:{'.validate':'newData.isBoolean()'},
  note:str(2000),
  reviewed:{'.validate':'newData.val() === true'},
  reviewedAt:{'.validate':'newData.val() === now'},
  reviewedBy:{'.validate':'newData.val() === auth.uid'},
  $other:{'.validate':false}}};
await fs.writeFile(file,JSON.stringify(rules,null,2)+'\n');
console.log('Grade 9 VR rules written.');
