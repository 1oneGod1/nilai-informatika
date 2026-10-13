# Grade 11 AI Studio — Firebase workflow

1. Sign in as a verified teacher. In **Monitor kelas 11 · AI Studio**, activate each student's cloud account once. The account uses the existing CS.Report student password; no student email is needed.
2. Students search their name/NIS, enter their password, and open AI Studio. Daily targets, project evidence, readiness, formative/summative evidence, reflections and practice quiz attempts sync to Realtime Database.
3. Teachers filter the monitor by class/name or pending work. **Lihat bukti & nilai** opens the relevant student; select the course/F1/F2/F3/summative tab to see evidence and open submitted links.
4. Send feedback as **Sudah dilihat**, **Perlu revisi**, or **Diterima**. Students see the message and whether it refers to their current evidence version.
5. Enter rubric points, mark each component reviewed, and save. Course completion is 20%, F1–F3 together 30%, and summative 50%. Partial grading saves without replacing the last official grade. All 14 reviewed components publish the final score atomically with the rubric.
6. A later evidence revision invalidates only the affected review. The last published grade stays until the teacher finishes reviewing again. The combined score appears as **Nilai akhir AI Q2**, with course and summative raw scores stored separately.

## Recovery and account management

- Temporary connection loss queues edits in the browser; reconnect or use **Retry sync**. Wait for **Saved to Firebase** before switching devices. Offline queues are specific to the browser/device.
- Existing local notes migrate when cloud records are missing. If cloud and local notes differ, cloud records win and a downloadable local backup is retained.
- Students can change their password from their grade page. A forgotten Grade 11 password submits a request for teacher approval. Teacher resets rotate the student's Auth binding and revoke the old session's private database access.
- Sign out on shared devices. Session IDs contain no passwords. Teacher and student Firebase Authentication apps are separate.
- The database stores text/links and assessment records, not uploaded media files. BSD course work and its own completion remain in BSD; CS.Report records submitted evidence for teacher review.

## Database paths and permissions

- `grade11AiAccounts/{studentId}`: non-secret Auth uid/email alias binding; verified teachers/admins write.
- `learningProgress/{studentId}/grade11Ai/student`: owner-only writes to validated project, guide and target entries.
- `learningProgress/{studentId}/grade11Ai/teacher/reviews`: verified teacher/admin feedback; owner reads.
- `siswa/{studentId}/digitalCitizenshipAssessment/q2` and Q2 grade fields: verified teacher/admin writes; final fields and rubric save together.
- Student Auth users cannot grant themselves verified teacher status, alter grades, write teacher feedback or read other Grade 11 private progress. Legacy Grade 10 public exercise routes retain their existing behavior.

## Validation

Validated with synthetic records only: 45 emulator rule checks; actual Firebase SDK provisioning/login/sync/offline/recovery/reset checks; browser student-to-teacher-to-student feedback/revision flow; complete rubric example (100 course, 80 formative, 70 summative → final 79); regression checks for Grade 8, 9, 10 and 12.
