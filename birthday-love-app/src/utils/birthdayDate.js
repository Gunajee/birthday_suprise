// ═══════════════════════════════════════════════════════════
// Birthday date logic — drives the hero title and the post-birthday
// "hint button" visibility.
//
// Her birthday: July 13th (any year — checked by month/day only, so
// this works correctly every year without code changes).
// ═══════════════════════════════════════════════════════════

export const BIRTHDAY_MONTH = 7; // July (1-indexed for readability)
export const BIRTHDAY_DAY = 13;

/** True only on July 13th, any year. */
export function isBirthdayToday(date = new Date()) {
  return (
    date.getMonth() + 1 === BIRTHDAY_MONTH && date.getDate() === BIRTHDAY_DAY
  );
}

/**
 * True any time AFTER July 13th has fully passed this year — i.e. from
 * July 14th onward, through the rest of the year. Resets naturally next
 * January since we compare month+day, not a stored flag.
 */
export function isAfterBirthdayThisYear(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month > BIRTHDAY_MONTH) return true;
  if (month === BIRTHDAY_MONTH && day >= BIRTHDAY_DAY) return true;
  return false;
}

/** Days remaining until the next July 13th (0 on the day itself). */
export function daysUntilBirthday(date = new Date()) {
  const year = date.getFullYear();
  let target = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
  // If this year's birthday has already passed, count toward next year's.
  const todayStripped = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  if (todayStripped > target) {
    target = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target - todayStripped) / msPerDay);
}

/**
 * One function the UI actually needs: which "mode" to render.
 *   'birthday' → it's July 13th today
 *   'before'   → before July 13th this year (show countdown / advance wishes)
 *   'after'    → after July 13th this year (show hint button, etc.)
 */
export function getBirthdayMode(date = new Date()) {
  if (isBirthdayToday(date)) return "birthday";
  if (isAfterBirthdayThisYear(date)) return "after";
  return "before";
}
