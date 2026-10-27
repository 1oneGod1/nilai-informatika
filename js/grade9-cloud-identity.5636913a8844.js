/* Grade 9 VR Studio mirrors the Grade 8 identity flow: a secondary Auth app,
 * first-login self-enrollment proven by the existing CS.Report password
 * (checked by database rules), and a nonsecret binding in grade9VrAccounts. */
const G9CloudIdentity=(()=>{
 let studentApp,provisionApp;
 const app=name=>{try{return firebase.app(name);}catch{return firebase.initializeApp(firebaseConfig,name);}};
 const student=()=>studentApp??=app('grade9-student'),stamp=()=>firebase.database.ServerValue.TIMESTAMP;
 async function account(id){return (await db.ref('grade9VrAccounts').child(id).once('value')).val();}
 async function emailFor(id){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(id))),hash=Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('').slice(0,32);return 'g9.'+hash+'.'+crypto.getRandomValues(new Uint32Array(2)).join('')+'@students.cs-report.invalid';}
 async function login(id,password){
  const secure=student();await secure.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);let binding=await account(id);
  if(!binding?.uid){
   const email=await emailFor(id),created=await secure.auth().createUserWithEmailAndPassword(email,password),user=created.user,ticket=secure.database().ref('grade9Enrollment').child(user.uid);
   let failure=null;
   try{
    await ticket.set({studentId:String(id),proof:password,at:stamp()});
    const claim={uid:user.uid,email,grade:9,createdAt:stamp(),createdBy:user.uid};
    const result=await secure.database().ref('grade9VrAccounts').child(id).transaction(current=>current?undefined:claim);
    binding=result.snapshot.val()||await account(id);
   }catch(error){const existing=await account(id).catch(()=>null);if(existing?.uid)binding=existing;else failure=Error(/permission/i.test(error.code||'')?'Password atau kelas siswa tidak sesuai. Masuk kembali dari CS.Report.':error.message);}
   finally{await ticket.child('proof').remove().catch(()=>{});}
   // Unlike the Grade 8 original, also remove the unused Auth user when enrollment fails,
   // so the secondary app is not left signed in as an unbound account.
   if(binding?.uid!==user.uid)await user.delete().catch(()=>secure.auth().signOut());
   if(failure)throw failure;
  }
  if(!binding?.email)throw Error('Akses pengiriman belum tersedia. Coba masuk kembali.');
  const result=await secure.auth().signInWithEmailAndPassword(binding.email,password);
  if(result.user.uid!==binding.uid){await secure.auth().signOut();throw Error('Sesi siswa tidak cocok. Masuk kembali dari CS.Report.');}
  return result.user;
 }
 async function restore(id){const secure=student();const user=await new Promise(resolve=>{let off=()=>{};off=secure.auth().onAuthStateChanged(u=>{resolve(u);queueMicrotask(()=>off());});});const binding=await account(id);if(!user||user.uid!==binding?.uid)throw Error('Masuk kembali melalui buku nilai dengan nama dan password CS.Report. Catatan di browser ini tetap tersimpan dan akan dikirim setelah tersambung.');return {user,db:secure.database()};}
 async function logout(){await student().auth().signOut();try{sessionStorage.removeItem('csReportGrade9Session');}catch{}}
 async function verifyTeacher(){const user=auth.currentUser;if(!user)throw Error('Masuk sebagai guru terlebih dahulu.');const row=(await db.ref('guru').child(user.uid).once('value')).val()||{};if(!isAdminEmail(user.email)&&!(row.isVerified===true&&(row.emailVerified===true||user.emailVerified===true)))throw Error('Guru belum terverifikasi.');return user;}
 async function changeOwnPassword(row,oldPassword,newPassword){const user=await login(row.id,oldPassword);await user.updatePassword(newPassword);try{await student().database().ref('siswa').child(row.id).update({password:newPassword,pendingPassword:null,pendingPasswordAt:null});}catch(error){await user.updatePassword(oldPassword).catch(()=>{});throw error;}}
 async function updateTeacherStudent(row,patch){await verifyTeacher();const old=await account(row.id);if(old?.uid&&typeof patch.password==='string'&&patch.password!==row.password){if(patch.password.length<6)throw Error('Password minimal 6 karakter.');provisionApp??=app('grade9-provisioning');await provisionApp.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);const email=await emailFor(row.id),created=await provisionApp.auth().createUserWithEmailAndPassword(email,patch.password);await provisionApp.auth().signOut();const updates={['grade9VrAccounts/'+row.id]:{uid:created.user.uid,email,grade:9,createdAt:stamp(),createdBy:auth.currentUser.uid}};for(const [k,v]of Object.entries(patch))updates['siswa/'+row.id+'/'+k]=v;await db.ref().update(updates);}else await siswaRef.child(row.id).update(patch);}
 return {login,restore,logout,account,stamp,verifyTeacher,changeOwnPassword,updateTeacherStudent};
})();
