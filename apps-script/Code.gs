/**
 * Scale Quest — class leaderboard.
 * Paste this whole file into Extensions → Apps Script in a Google Sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Only completed 20-question CHAOS runs are accepted, so every score is comparable.
 * Final score = points × key bonus (1.0 + 0.1 for each key beyond the first).
 * Every saved score becomes a row on the "Scores" tab.
 * To reset the board (new marking period), delete the rows under the header.
 */
const SHEET_NAME = 'Scores';
const TOP_N = 10;
const CHAOS_LEN = 20;
const MAX_POINTS = 4650;   // 20 perfect answers + max speed bonus + every streak bonus

function doGet() {
  return json_({ ok: true, top: top_(TOP_N) });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const name = String(d.name || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
    const score = Math.floor(Number(d.score));
    const points = Math.floor(Number(d.points));
    const streak = Math.floor(Number(d.streak));
    const questions = Math.floor(Number(d.questions));
    const keyCount = Math.floor(Number(d.keyCount));
    const accuracy = Math.max(0, Math.min(100, Math.round(Number(d.accuracy) || 0)));
    const keys = String(d.keys || '').replace(/[^A-Gb# ]/g, '').slice(0, 60);
    const bonus = Math.round((1 + 0.1 * (keyCount - 1)) * 10) / 10;

    // Reject anything a real ranked CHAOS run can't produce.
    const valid = name &&
      questions === CHAOS_LEN &&
      keyCount >= 1 && keyCount <= 15 &&
      points >= 0 && points <= MAX_POINTS &&
      score === Math.round(points * bonus) &&
      streak >= 0 && streak <= CHAOS_LEN;
    if (!valid) return json_({ ok: false, error: 'invalid score' });

    sheet_().appendRow([new Date(), name, score, points, bonus, keyCount, keys, streak, accuracy]);
    return json_({ ok: true, top: top_(TOP_N) });
  } catch (err) {
    return json_({ ok: false, error: 'bad request' });
  } finally {
    lock.releaseLock();
  }
}

// Best score per student (by initials), highest first.
function top_(n) {
  const sh = sheet_();
  const last = sh.getLastRow();
  if (last < 2) return [];
  const rows = sh.getRange(2, 1, last - 1, 9).getValues();
  const best = {};
  rows.forEach(r => {
    const name = String(r[1]);
    if (!name) return;
    const b = best[name] || (best[name] = { name: name, score: -1, keys: 0, streak: 0 });
    const score = Number(r[2]) || 0;
    if (score > b.score) { b.score = score; b.keys = Number(r[5]) || 0; }
    b.streak = Math.max(b.streak, Number(r[7]) || 0);
  });
  return Object.values(best).sort((a, b) => b.score - a.score).slice(0, n);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Date', 'Initials', 'Final Score', 'Points', 'Key Bonus', 'Key Count', 'Keys', 'Best Streak', 'Accuracy %']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
