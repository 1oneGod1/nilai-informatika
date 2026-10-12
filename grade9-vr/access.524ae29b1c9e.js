'use strict';
const VR_SESSION_KEY = 'csReportGrade9Session';
const VR_SESSION_MAX_AGE = 12 * 60 * 60 * 1000;
let vrSession = null;

function readVrSession() {
  try {
    const raw = sessionStorage.getItem(VR_SESSION_KEY);
    const localPreview = ['localhost', '127.0.0.1'].includes(location.hostname)
      && new URLSearchParams(location.search).get('preview') === '1';
    if (!raw && localPreview) return {
      id: 'local-vr-preview', name: 'Siswa Uji Kelas 9', className: '9A',
      verifiedAt: Date.now(), isLocalPreview: true,
    };
    if (!raw) return null;
    const value = JSON.parse(raw);
    const grade = Number(String(value?.className || '').match(/\d+/)?.[0]);
    const age = Date.now() - Number(value?.verifiedAt);
    if (typeof value?.id !== 'string' || !value.id || value.id.length > 128
      || typeof value.name !== 'string' || !value.name.trim()
      || grade !== 9 || !Number.isFinite(age) || age < 0 || age > VR_SESSION_MAX_AGE) {
      sessionStorage.removeItem(VR_SESSION_KEY);
      return null;
    }
    if (value.isTeacherPreview === true && new URLSearchParams(location.search).get('teacherPreview') !== '1') return null;
    return value;
  } catch {
    try { sessionStorage.removeItem(VR_SESSION_KEY); } catch {}
    return null;
  }
}

async function validateVrTeacher(session) {
  if (!session.teacherUid || typeof auth === 'undefined' || typeof db === 'undefined') return false;
  try {
    const user = await new Promise(resolve => {
      let unsubscribe = () => undefined;
      const timeout = setTimeout(() => { unsubscribe(); resolve(null); }, 12000);
      unsubscribe = auth.onAuthStateChanged(current => {
        clearTimeout(timeout); unsubscribe(); resolve(current || null);
      });
    });
    if (!user || user.uid !== session.teacherUid) return false;
    const email = String(user.email || '').trim().toLowerCase();
    const admin = ['andi.purba@sdh.or.id', 'pandapotanandi@gmail.com'].includes(email);
    const snapshot = await db.ref('guru').child(user.uid).once('value');
    const teacher = snapshot.val() || {};
    return (teacher.isVerified === true || admin)
      && (teacher.emailVerified === true || user.emailVerified === true || admin);
  } catch { return false; }
}

async function initializeVrAccess() {
  vrSession = readVrSession();
  if (vrSession?.isTeacherPreview === true && !(await validateVrTeacher(vrSession))) {
    vrSession = null;
    sessionStorage.removeItem(VR_SESSION_KEY);
    document.getElementById('gate-copy').textContent = 'Buka mode review dari dashboard guru yang sudah terverifikasi.';
  }
  if (!vrSession) return false;
  document.getElementById('access-gate').hidden = true;
  document.getElementById('learning-app').hidden = false;
  document.getElementById('learner-name').textContent = vrSession.name;
  document.getElementById('learner-class').textContent = vrSession.isTeacherPreview ? 'Review guru · Kelas 9' : `Kelas ${vrSession.className}`;
  const book = document.getElementById('book-link');
  const back = document.getElementById('portal-back');
  if (vrSession.isTeacherPreview) {
    CONFIG.gradebookUrl = '../dashboard.html';
    book.href = '../dashboard.html'; back.href = '../dashboard.html';
    document.getElementById('review-banner').hidden = false;
  }
  if (vrSession.isLocalPreview && !vrSession.isTeacherPreview) {
    document.getElementById('review-banner').hidden = false;
    document.getElementById('review-banner').textContent = 'Pratinjau lokal dengan identitas siswa uji. Tidak menggunakan data siswa nyata.';
  }
  return true;
}
