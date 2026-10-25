# Grade 8 BSD game assessment

Open the teacher dashboard, find **Game Studio: Mobile Game Developer**, and click **Nilai tugas BSD**. This selects Grade 8, Q2. Choose a student and a project.

| Gradebook field | Existing BSD project |
| --- | --- |
| Q2 F1 | Platformer Game |
| Q2 F2 | Traffic Looper |
| Q2 F3 | Nonogram |
| Q2 F4 | Dungeon Battle |
| Q2 F5 | Wall Jumper |

Each project has 100 possible points: controls 20, game rules 20, code understanding 25, testing 20, modification 10, and honest process/source attribution 5. Criteria use the exact variables and behaviors covered in the existing Grade 8 guides and their audited BSD project revisions.

Use the student's existing BSD work or a live demo; repeating the course or completing website practice quizzes is not required. Optionally save a project URL, enter full/partial rubric points and feedback, mark **Komponen sudah diperiksa guru**, then save. Only reviewed projects update their corresponding formative field. A reviewed zero is a valid score. Unreviewed projects, older grades and the summative field are not overwritten.

Editing rubric points or the evidence link requires marking the project reviewed again. Rubric points, review state, link and teacher note reload from the existing student assessment record. The Grade 8 Q1 Digital Citizenship rubric remains available through the period selector.


## Student submissions in Firebase

Students use the normal CS.Report name/NIS and password login, then **Buka Game Studio**. Grade 8 Firebase access is enrolled automatically on the first successful login; no teacher activation or different student password is needed.

Each meeting asks for a playable project URL, one change, and a short test result/reflection. Typing saves a **draft**. **Submit to teacher / Kirim tugas ke guru** creates a separate immutable snapshot with a version and server timestamp. A submission is shown as received only after Firebase confirms the write. Offline work stays queued in the same browser and retries when connected; students can download their notes. Later typing edits the draft while preserving the last submitted version for the teacher. Website quiz scores remain practice only.

Teacher path: **Dashboard → Nilai tugas BSD → Grade 8 / Q2 → student → F1–F5**. Evidence appears beside the rubric. The teacher can open the student's link, read changes and test results, send feedback (seen / needs revision / accepted), enter rubric points, mark reviewed, and save. Feedback does not publish a grade. New submissions require a fresh review; draft edits do not. The evidence snapshot used for a saved review is retained with that rubric record. Old official grades stay until the teacher explicitly reviews and saves a replacement.

Firebase Realtime Database paths:

- `grade8GameAccounts/{studentId}`: nonsecret Auth binding; no school password.
- `grade8Enrollment/{uid}`: private first-login verification ticket; password proof is removed immediately after enrollment.
- `learningProgress/{studentId}/grade8Games/student/lessons/{1..8}`: current draft plus `submission` snapshot.
- `learningProgress/{studentId}/grade8Games/teacher/reviews/{lessonId}`: teacher feedback tied to a submission version.
- `siswa/{studentId}/digitalCitizenshipAssessment/q2`: teacher rubric with evidence versions/snapshots; reviewed F1–F5 scores sync to gradebook fields.

New Grade 8 progress is readable only by its bound student or a verified teacher; only the student writes their drafts/submissions, and only teachers write feedback and official grades. Secondary Firebase Auth keeps the teacher's main session separate. Teacher password resets rotate the Grade 8 binding and revoke old student access while retaining submissions.

## Recovering old browser-only work

Students must reopen **the same website origin and browser/profile** where they previously wrote notes, sign in again through CS.Report, and open Game Studio. Existing notes and optional quiz history are retained. Notes migrate as drafts; an old local “complete” flag does not count as a submitted task. Students check the recovered URL, change and reflection, then press Submit. A local migration backup is downloadable when present. If cloud work already exists and differs from older local notes, cloud work is restored and older local notes remain in the backup. Browser storage from `web.app`, Render, and localhost is separate; cleared browser data cannot be recovered by this migration.

## Validation

Firebase Auth + Realtime Database emulators exercised self-enrollment, proof cleanup, normal login, private access, teacher feedback, rejection of student grade writes, old-note migration, submission confirmation/versioning, later draft edits, offline queues, cross-browser recovery, password changes/resets, rubric evidence capture and stale-review handling. Existing rubric regression checks covered reviewed-only F1–F5, a reviewed zero, untouched sumatif/Q1/other-grade calculations, and all eight bilingual guides with 24 practice questions. Browser QA used synthetic students and teachers only.
