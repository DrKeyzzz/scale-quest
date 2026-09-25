# Scale Quest

An arcade-style major scale trainer for beginner music theory. Students check the keys they want, build each scale on a piano, find scale degrees on piano and treble staff, then mix everything in CHAOS mode.

**Play:** https://drkeyzzz.github.io/scale-quest/

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
