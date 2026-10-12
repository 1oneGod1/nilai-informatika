# Sustainable Web Studio — Grade 12

Bilingual classroom companion for BSD Connect2Work Course 3, integrated into CS.Report's existing student verification and teacher dashboard. The working timetable is 26 × 90 minutes; approximately 30 meetings are suggested for 80-minute periods. This is a teaching estimate, adjustable after diagnostics.

## Content and behaviour

- 26 lesson briefs, each with a main goal, material summary, three tasks, three success criteria, BSD pointers, a practical Biblical Christian Worldview connection, a read-aloud introduction, and a 90-minute agenda.
- 26 opening diagnostic questions, 52 post-practice questions, explanations after an attempt, 26 opening discussion prompts, and 26 exit tickets.
- Assignment 1 organization website, Assignment 2 database news website, and e-commerce checkpoints through testing, revision, and final demonstration.
- The six final rubric criteria match the existing Grade 12 Q2 configuration. Official quarter placement, assessment IDs, weights, and student grades are unchanged.
- Practice notes are browser-local, scoped by student ID. Language changes share the same records and preserve quiz drafts. First diagnostic scores and best practice scores are stored separately.
- Official submissions follow current teacher instructions. Legacy dates, Moodle submission instructions, and percentages from BSD assignment briefs are not adopted as current policy.
- Teacher review validates the current Firebase user and teacher status. `?preview=1` only works on localhost/127.0.0.1 and uses a synthetic identity. Production preview parameters do not bypass access.

## Editing and publishing

Edit canonical `data.js`, `access.js`, `app.js`, or `style.css`, then run:

```text
node scripts/prepare-grade12-assets.mjs
```

The helper produces fingerprinted lesson assets and student/teacher portal scripts and updates the HTML entries. Keep published fingerprinted assets for existing open pages. No server or database schema change is required.

Student flow: name/NIS search → existing password verification → Grade 12 Sustainable Web Studio card. Teacher flow: existing verified dashboard → Review Sustainable Web Studio.

Coding activities are completed in BSD; this companion supplies classroom orientation, practice, reflection, and assessment guidance. The final testing and presentation checkpoints are teacher-designed additions aligned with CS.Report.
