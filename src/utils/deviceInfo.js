import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getClientFingerprint() {
  // Load the FingerprintJS agent
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  // Detect browser & OS
  const userAgent = navigator.userAgent;
  const browser = getBrowser(userAgent);
  const os = getOS(userAgent);

  return {
    visitorId: result.visitorId,
    browser,
    os,
    userAgent,
  };
}

// --- Helpers ---
export function getBrowser(userAgent) {
  if (/edg/i.test(userAgent)) return "Edge";
  if (/chrome|crios|crmo/i.test(userAgent)) return "Chrome";
  if (/firefox|fxios/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome|crios|crmo|edg/i.test(userAgent))
    return "Safari";
  return "Unknown";
}

export function getOS(userAgent) {
  if (/windows/i.test(userAgent)) return "Windows";
  if (/macintosh|mac os x/i.test(userAgent)) return "MacOS";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Unknown";
}
