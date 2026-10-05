# Scale Quest

An arcade-style scale trainer for music theory: all 15 major scales, natural / harmonic / melodic minor and the modes on every tonic (with double sharps and flats where needed) (Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian). Students check the scales they want, build each scale on a piano (starting on the root and going up one octave), find scale degrees on piano and treble staff, then mix everything in CHAOS mode.

**Play:** https://drkeyzzz.github.io/scale-quest/

## How scores work

Practice mode has no timer, so students can work at their own pace. After a mistake, practice mode explains what went wrong (for example, "A is the 6th of C major, not the 7th. The 7th is B.") and waits until the student clicks NEXT QUESTION.

Only a finished **CHAOS** run can go on the board. Every CHAOS run is 20 questions, so scores compare fairly.

- 100 points per correct answer (50 on a second try at building a scale), plus streak bonuses at 3, 5, 10 and 20 in a row.
- **Speed bonus (CHAOS only):** up to +100 per correct answer, shrinking to 0 over 10 seconds (piano), 12 seconds (staff) or 25 seconds (building a scale). The clock pauses during feedback.
- **Key bonus:** +10% for each key beyond the first (4 keys = x1.3, all 15 = x2.4).
- Runs that use CONTINUE, practice runs and quit runs can't be posted.

## Students, classes and the Teacher Dashboard

Scale Quest shares the **Rhythm Trainer's Firebase project** (`rhythm-trainer-fc313`), so the same class codes and Google teacher sign-in work in both games.

**Welcome screen:** the first time a student opens the game on a device, they enter their **first name, last initial and class code** (or check "I'm not in a class"). If they've already used the Rhythm Trainer on that computer, their name fills in. The **👤 name** button in the top bar changes class or switches student.

**Leaderboards:** the student's **class** board (each student's best CHAOS run) and the **World Top 10** (the 10 best runs from everyone). After a CHAOS run, students tap **POST MY SCORE** and see their rank, like "#2 in Period 3 · #14 in the world."

**Progress tracking:** every answer is logged on the device. Students with a class code sync one summary per day (first name and last initial only): questions, accuracy, minutes, accuracy per key and per question type, most-missed questions (with what they answered instead) and CHAOS runs. Only that class's teacher can read it.

**Teacher Dashboard** (SETUP → TEACHER DASHBOARD → Sign in with Google)
- **Progress:** pick a class and day (Today, Yesterday, Last 7 days or a date). Time, questions, accuracy, best CHAOS score, weakest keys and last active for each student; live updates every 30 seconds. Click a student for their key and question-type breakdown and most-missed questions. The top shows class accuracy by key and the most-missed questions. **Export CSV** for your gradebook.
- **Assignment:** pick the keys to practice, a questions goal, a minutes goal and a note. Students see a banner with their progress and a **USE THESE KEYS** button.
- **Classes:** the same classes as the Rhythm Trainer. Create or rename a class, or **clear Scale Quest data** for a new marking period. (Delete a class from the Rhythm Trainer's dashboard.)
- **Scores:** delete a single CHAOS score (for example an inappropriate name). The admin email can also manage the World board.

**Rules:** [`firestore.rules`](firestore.rules) covers **both** games and is identical in both repos. Whenever it changes, paste it into Firebase → Firestore Database → Rules → **Publish**.

## SUPERNOVA (the ultimate test)

- One button next to START and CHAOS. It always uses **all 150 scales**: 20 questions, **2 hearts**, no CONTINUE, no second try at building a scale, and no explanations until the end (the end screen lists every miss). Same timer and speed bonus as CHAOS.
- Modes are shown as a ladder of stars: PRACTICE (small calm star), CHAOS (pulsing star), SUPERNOVA (big swelling star with rays).
- **Finish all 20** for a celebration screen with a certificate and a permanent animated star next to your name on every Scale Quest leaderboard. Reach question 10 for the **SURVIVOR** mark.
- The **★ SUPERNOVA** tab on the leaderboard shows class and world runs (finished first). Runs are stored in `nova_scores`.
- The teacher dashboard shows SUPERNOVA attempts, finishes and who earned it.
- Questions ask for the 2nd through 7th (never the tonic or octave).

## Minor scales and modes

- The top bar has **MAJOR / MINOR / MODES** tabs; scales checked in any tab stay selected and can be mixed.
- **SELECT ▾** checks or unchecks whole groups: the mode or minor form you're looking at (e.g. all Dorian), the whole tab (all modes), **everything** (150 scales), or **clear all**. The button shows how many are checked.
- **Melodic minor** goes up with a raised 6th and 7th and comes down as natural minor. Building it asks "going up" or "going down"; questions about its 6th or 7th say which direction. (The first build of a melodic minor in practice is always going up.)
- The staff never shows a key signature: students add every sharp, flat, double sharp or double flat themselves (the 3rd of G♭ major = B + ♭).
- Every scale is spelled correctly, with **double sharps (𝄪) and double flats (𝄫)** where the theory needs them (G♯ harmonic minor has F𝄪, G♭ Dorian has B𝄫). The staff has 𝄫 ♭ ♮ ♯ 𝄪 buttons. 150 scales in all.
- The CHAOS key bonus counts up to 15 scales.
- **Questions per scale** (practice mode) is next to the START button.

## Changing the scale data

Major scale spellings live in the `SCALES` object in `index.html`; minor scales and modes are spelled from them by `spell()` using the step patterns in `SCALE_TYPES`.
