// Set cookie
export function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax${secure}`;
}

// Get cookie
export function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

const VISITOR_ID_COOKIE = "x-visitor-id";

// Get visitor ID from cookie
export function getVisitorId() {
  return getCookie(VISITOR_ID_COOKIE);
}

// Set visitor ID in cookie
export function setVisitorId(visitorId) {
  if (visitorId) {
    setCookie(VISITOR_ID_COOKIE, visitorId, 15);
  }
}
