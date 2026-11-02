# Grade 9 VR Studio — Firebase submissions and F1 grading

Grade 9 VR Studio (`grade9-vr/`) now sends each meeting's task to the teacher through Firebase. This follows the Grade 8 Game Studio pattern (`GRADE8_BSD_ASSESSMENT.md`).

## Students

1. In CS.Report, search for your name/NIS, enter your normal CS.Report password, then select **Buka VR Studio**. On first login, the student's Firebase identity is created automatically. Database rules check that the password matches the existing CS.Report password and that the student's class starts with `9`. No teacher activation is needed. If the cloud login fails, the grade page still opens. VR Studio then works locally and shows "Belum tersambung ke guru".
2. Each meeting (1–9) shows the challenge and **Bukti yang diminta / Evidence required** next to a **Kirim tugas ke guru / Submit to teacher** form with three required fields. The form is specific to each meeting:
   - **BSD project link**: an `https://` share link (the only link/attachment; there are no uploads).
   - **Jelaskan buktimu (sesuai tantangan)**: the placeholder is the meeting's own example.
   - The meeting's own **reflection question**.

   Per-meeting texts live in `grade9-vr/data.js` and `data-en.js`: `submitEvidence` (student-facing evidence request: BSD link plus a written description, with no screenshots or sketches to upload) and `submitExample` (placeholder). The original `evidence` field (teacher brief/plan) is unchanged. The teacher panel copies `submitEvidence` in `G9_VR_LESSON_EVIDENCE` (`js/grade9-vr-submissions.js`). The emulator test checks that the two copies match.

   The existing exit-ticket answer is sent with the draft and submission when present.
3. Typing saves a **draft** online. **Kirim tugas ke guru** creates an immutable submission snapshot with a version number, a request ID and the server timestamp. The form shows "sudah diterima Firebase" only after Firebase confirms the write. Offline work is queued in the browser and retried. Notes that were stored only in the browser before this change migrate as drafts, and a downloadable backup is kept. An old "ditandai selesai" flag does not count as a submission.
4. Teacher feedback appears under the form, labelled *Sudah dilihat*, *Perlu revisi* or *Diterima guru*. Practice-quiz scores stay in the browser and are never sent.

## Teacher

Go to **Dashboard → Penilaian rubrik → "Kelas 9 · VR Studio · Bukti & nilai F1"**.

- Filter by class (9A/9B/9C), by name, or by *Kiriman perlu diperiksa* / *F1 belum dinilai*.
- For each student, the panel shows the F1 submission status, submission time (WIB), version, link, evidence, reflection and exit ticket. Any newer unsubmitted draft is shown separately.
- **Lihat bukti pertemuan** switches the evidence view to any meeting 1–9. It shows that meeting's required evidence and the student's answers. The F1 calculator always uses meeting 1.
- Feedback (seen / needs_revision / accepted) is sent for the meeting being viewed and is tied to that submission version. Sending feedback does not change any grade.
- **F1 grade**: F1 is meeting 1, BSD "Set up A-Frame" plus the challenge.
  - Due: Monday 26 Oct 2026, end of day WIB. Project due dates in the submission overview (`G9_VR_LESSON_DUE`): P1 26 Oct, P2 1 Nov, P3 8 Nov 2026.
  - Suggested score: `base − 5 × daysLate`. Final rule: `max(KKM, base − 5 × daysLate)`; the grade 9 KKM (`settings/kkm/9`, currently 74) is always the floor, also when the teacher lowers the base for quality.
  - `daysLate` is the number of calendar days in WIB between the completion date and 26 Oct (0 if the work was completed on or before that date).
  - The completion date is the **manual completion date** if the teacher enters one (for work finished in BSD before this feature existed). Otherwise it is the date of the Firebase submission timestamp.
  - The base defaults to 100. The teacher can lower it for quality and can override the final score.
  - Tick **Sudah diperiksa guru**, then **Simpan nilai F1**. This writes only `siswa/{id}/q2_f1` and `siswa/{id}/grade9VrGrades/q2_f1`. The second path stores the score, base, completion date and source, days late, KKM, suggested score, whether the score was overridden, the evidence version, and the reviewer.
  - F2, F3, the summative score, Q1 and other grades are not changed.
- A reviewed VR F1 grade takes precedence over the existing Grade 9 Q2 rubric (`digitalCitizenshipAssessment/q2`) for `q2_f1`. Gradebook auto-sync and rubric saves therefore keep the reviewed value.
- When a teacher resets a Grade 9 student's password (table save or by approving a password request), the Firebase binding is rotated. The old student session loses access, but the submissions are kept.

Configuration lives in `js/grade9-vr-submissions.js` → `G9_VR_GRADING`: due date, penalty per day, default base, lesson number and gradebook field. To add F2 or F3, add another entry there; the panel currently renders F1 only.

## Firebase paths

| Path | Contents / access |
| --- | --- |
| `grade9VrAccounts/{studentId}` | Non-secret Auth binding: uid, `g9.<hash>.<rand>@students.cs-report.invalid`, grade 9. |
| `grade9Enrollment/{uid}` | First-login ticket. Its `proof` must equal the CS.Report password (or the default if none is stored) and is removed immediately after enrollment. |
| `learningProgress/{studentId}/grade9Vr/student/lessons/{1..9}` | Draft plus a `submission` snapshot. Only the bound grade 9 student can write it. The student and verified teachers can read it. |
| `learningProgress/{studentId}/grade9Vr/teacher/reviews/{lessonId}` | Teacher feedback. Teacher-only. `sourceVersion` must match the current submission version. |
| `siswa/{studentId}/q2_f1`, `siswa/{studentId}/grade9VrGrades/q2_f1` | Teacher-only, written by a reviewed save. |

Rules changes, generated by `scripts/add-grade9-vr-rules.mjs` (idempotent):

- The new sections mirror Grade 8.
- `siswa/$siswaId/password` now also allows the bound grade 9 uid.
- The unauthenticated password-write branch now excludes classes matching `/^(8|9|11)/`, so anonymous clients can no longer change Grade 9 passwords.

## Validation

`scripts/test-grade9-vr-emulator.cjs` runs the real browser files against the Auth and Realtime Database emulators, using project `demo-nilai`, synthetic data, and the repository's `database.rules.json`:

```
NODE_PATH=<folder containing node_modules with firebase@10> \
npx firebase emulators:exec --only auth,database --project demo-nilai "node scripts/test-grade9-vr-emulator.cjs"
```

The emulators need Java 11+. `firebase.json` contains an `emulators` block (auth 9099, database 9000). The script refuses to run unless the emulator host environment variables are set.

## Publishing (after review)

1. Run the asset scripts:
   - `node scripts/prepare-grade9-english.mjs`
   - `node scripts/prepare-grade9-assets.mjs`
   - `node scripts/prepare-grade8-assessment-assets.mjs` (student/teacher/teacher-assessment)
   - `node scripts/prepare-grade9-submission-assets.mjs`
2. Deploy the database rules **first**: `firebase deploy --only database --project nilai-informatika`. Without the new rules, grade 9 enrollment fails and VR Studio stays local-only.
3. Merge to `main`. Render auto-deploys. Then run `firebase deploy --only hosting --project nilai-informatika`.

## Project grades F1–F3 (70/30)

Teacher rule since Nov 2026: each VR project P1–P3 is graded as F1–F3 (`G9_VR_GRADING` in `js/grade9-vr-submissions.js`):

| Project | Meeting | Rubric component | Field | Due (end of day WIB) |
| --- | --- | --- | --- | --- |
| P1 | 1 | 01 `vrFundamentals` | `q2_f1` | Mon 26 Oct 2026 |
| P2 | 2 | 02 `modelsAnimation` | `q2_f2` | Sun 1 Nov 2026 |
| P3 | 3 | 03 `interactiveVr` | `q2_f3` | Sun 8 Nov 2026 |

`base = 0.7 × BSD course completion % + 0.3 × challenge score (0–100)`; `score = max(KKM, base − 5 × daysLate)`.
- Course: tick **Semua step course BSD selesai** → 100% (70 points) automatically; otherwise the teacher enters the completion % manually.
- Challenge: scored with the project's own rubric `G9_VR_CHALLENGE_RUBRIC` (5 criteria, total 100: P1 second coloured object / layout / colour code / position code / reflection; P2 composite model / parent entity / transform via parent / explanation / reflection; P3 two moods / visible difference / A-vs-B comparison / reason / reflection). Scores are stored in `fNLate.challengeScores`.
In the rubric workspace (Kelas 9 → Q2 → student → component 01/02/03) the evidence panel asks for course % and challenge score, then **Terapkan ke rubrik** fills that component's criteria proportionally, writes the audit note (`F2 VR: course 80% × 0.7 + challenge 90 × 0.3 = 83; …`) and marks it reviewed. Metadata is stored in `digitalCitizenshipAssessment/q2/f1Late|f2Late|f3Late` only for reviewed components. A legacy single base (records without `course`) still works.
