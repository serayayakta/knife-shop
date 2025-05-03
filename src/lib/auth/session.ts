const SESSION_KEY = "adminSession";
const EXPIRY_KEY = "adminSessionExpiry";
const SESSION_DURATION = 1000 * 60 * 60; // 1 hour

export function setAdminSession() {
  localStorage.setItem(SESSION_KEY, "active");
  localStorage.setItem(EXPIRY_KEY, String(Date.now() + SESSION_DURATION));
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export function isSessionValid(): boolean {
  const session = localStorage.getItem(SESSION_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);
  const now = Date.now();

  return !!session && !!expiry && now < Number(expiry);
}
