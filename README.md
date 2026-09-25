# Scale Quest

An arcade-style major scale trainer for beginner music theory. Students check the keys they want, build each scale on a piano, find scale degrees on piano and treble staff, then mix everything in CHAOS mode.

**Play:** https://drkeyzzz.github.io/scale-quest/

## How scores work

Only a finished **CHAOS** run can go on the board. Every CHAOS run is 20 questions, so scores compare fairly.

- 100 points per correct answer (50 on a second try at building a scale), plus streak bonuses at 3, 5, 10 and 20 in a row.
- **Speed bonus:** up to +100 per correct answer, shrinking to 0 over 10 seconds (piano), 12 seconds (staff) or 25 seconds (building a scale). The clock pauses during feedback.
- **Key bonus:** +10% for each key beyond the first (4 keys = x1.3, all 15 = x2.4).
- Runs that use CONTINUE, practice runs and quit runs can't be posted.

## Class leaderboard setup (one time, about 5 minutes)

Scores go to a Google Sheet you own.

1. Create a new Google Sheet (name it "Scale Quest Scores").
2. In the sheet: **Extensions → Apps Script**.
3. Delete what's in the editor, paste in everything from [`apps-script/Code.gs`](apps-script/Code.gs), and click **Save**.
4. Click **Deploy → New deployment**. Click the gear next to "Select type" and pick **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then **Authorize access** and allow it. (Google may warn that the app isn't verified. Click **Advanced → Go to project** because it's your own script.)
6. Copy the **Web app URL** (it ends in `/exec`).
7. In `index.html`, paste that URL into `const SCORES_URL = '';` near the top of the script, and commit.

Scores appear on the **Scores** tab of the sheet. To reset for a new marking period, delete the rows under the header.

## Changing the scale data

All scale spellings live in the `SCALES` object in `index.html`.
