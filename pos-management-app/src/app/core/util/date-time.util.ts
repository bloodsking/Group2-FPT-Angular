export function getCurrentTimestamp(): string {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  return localDate.toISOString().slice(0, 19).replace('T', ' ') + '.000000';
}
