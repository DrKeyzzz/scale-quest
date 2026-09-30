# Scale Quest

An arcade-style major scale trainer for beginner music theory. Students check the keys they want, build each scale on a piano (starting on the root and going up one octave), find scale degrees on piano and treble staff, then mix everything in CHAOS mode.

**Play:** https://drkeyzzz.github.io/scale-quest/

## How scores work

Practice mode has no timer, so students can work at their own pace. After a mistake, practice mode explains what went wrong (for example, "A is the 6th of C major, not the 7th. The 7th is B.") and waits until the student clicks NEXT QUESTION.

Only a finished **CHAOS** run can go on the board. Every CHAOS run is 20 questions, so scores compare fairly.

- 100 points per correct answer (50 on a second try at building a scale), plus streak bonuses at 3, 5, 10 and 20 in a row.
- **Speed bonus (CHAOS only):** up to +100 per correct answer, shrinking to 0 over 10 seconds (piano), 12 seconds (staff) or 25 seconds (building a scale). The clock pauses during feedback.
- **Key bonus:** +10% for each key beyond the first (4 keys = x1.3, all 15 = x2.4).
- Runs that use CONTINUE, practice runs and quit runs can't be posted.

## Class leaderboard setup (Firebase, one time, about 10 minutes)

Scores are stored in a free Firebase (Firestore) database you own. The free Spark plan needs no credit card.

1. Go to https://console.firebase.google.com and click **Create a project**. Give it a general name you can reuse for all your class games (for example `milnes-class-games`). You can turn off Google Analytics.
2. In the left menu: **Build → Firestore Database → Create database**. Pick a US location and **Start in production mode**.
3. Open the **Rules** tab, replace everything with the contents of [`firestore.rules`](firestore.rules), and click **Publish**.
4. Click the gear → **Project settings**. Under "Your apps", click the **web icon `</>`**, name the app `Class Games` (no Hosting), and click **Register app**. All your games can share this one web app config.
5. Copy the `firebaseConfig = { ... }` object it shows and paste it into `const FIREBASE_CONFIG = null;` near the top of the script in `index.html` (replace `null`).

The config values are meant to be public; the rules are what protect the data.

**One project, many games:** each game stores its scores under `games/<game-id>/scores` (Scale Quest uses `games/scale-quest/scores`) and gets its own section in the rules.

**Managing scores:** Firestore Database → `games` → `scale-quest` → `scores`. Delete a single score by opening it and choosing **Delete document**. To reset for a new marking period, delete the `scores` collection.

## Changing the scale data

All scale spellings live in the `SCALES` object in `index.html`.
