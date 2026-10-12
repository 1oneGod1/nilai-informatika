'use strict';
const G12_SESSION_KEY = 'csReportGrade12Session';
const G12_SESSION_MAX_AGE = 12 * 60 * 60 * 1000;
let g12Session = null;
function readG12Session() {
  try {
    const raw = sessionStorage.getItem(G12_SESSION_KEY);
    const localPreview = ['localhost','127.0.0.1'].includes(location.hostname) && new URLSearchParams(location.search).get('preview') === '1';
    if (!raw && localPreview) return { id: 'local-grade12-preview', name: 'Grade 12 Test Student', className: '12A', verifiedAt: Date.now(), isLocalPreview: true };
    if (!raw) return null;
    const value = JSON.parse(raw), age = Date.now() - Number(value?.verifiedAt);
    const grade = Number(String(value?.className || '').match(/\d+/)?.[0]);
    if (typeof value?.id !== 'string' || !value.id || value.id.length > 128 || typeof value.name !== 'string' || !value.name.trim() || grade !== 12 || !Number.isFinite(age) || age < 0 || age > G12_SESSION_MAX_AGE) {
      sessionStorage.removeItem(G12_SESSION_KEY); return null;
    }
    if (value.isTeacherPreview === true && new URLSearchParams(location.search).get('teacherPreview') !== '1') return null;
    return { ...value, isLocalPreview: false };
  } catch { try { sessionStorage.removeItem(G12_SESSION_KEY); } catch {} return null; }
}
async function validateG12Teacher(session) {
  if (!session.teacherUid || typeof auth === 'undefined' || typeof db === 'undefined') return false;
  try {
    const user = await new Promise(resolve => {
      let unsubscribe = () => undefined;
      const timeout = setTimeout(() => { unsubscribe(); resolve(null); }, 12000);
      unsubscribe = auth.onAuthStateChanged(current => { clearTimeout(timeout); unsubscribe(); resolve(current || null); });
    });
    if (!user || user.uid !== session.teacherUid) return false;
    const email = String(user.email || '').trim().toLowerCase();
    const admin = ['andi.purba@sdh.or.id','pandapotanandi@gmail.com'].includes(email);
    const snapshot = await db.ref('guru').child(user.uid).once('value');
    const teacher = snapshot.val() || {};
    return (teacher.isVerified === true || admin) && (teacher.emailVerified === true || user.emailVerified === true || admin);
  } catch { return false; }
}
async function initializeG12Access() {
  g12Session = readG12Session();
  if (g12Session?.isTeacherPreview === true && !(await validateG12Teacher(g12Session))) {
    g12Session = null; sessionStorage.removeItem(G12_SESSION_KEY);
    document.getElementById('gate-copy').textContent = t('Buka review dari dashboard guru terverifikasi.','Open review from a verified teacher dashboard.');
  }
  if (!g12Session) return false;
  document.getElementById('access-gate').hidden = true;
  document.getElementById('learning-app').hidden = false;
  document.getElementById('learner-name').textContent = g12Session.name;
  document.getElementById('learner-class').textContent = g12Session.isTeacherPreview ? t('Review guru · Kelas 12','Teacher review · Grade 12') : t('Kelas ','Class ') + g12Session.className;
  if (g12Session.isTeacherPreview) {
    CONFIG.gradebookUrl = '../dashboard.html';
    document.getElementById('book-link').href = CONFIG.gradebookUrl;
    document.getElementById('portal-back').href = CONFIG.gradebookUrl;
  }
  return true;
}
