export const isDesktop = navigator.userAgent.includes("Electron");

export function detectOS() {
  const platform = navigator.platform;
  if (platform.indexOf("Win") !== -1) return "Windows";
  if (platform.indexOf("Mac") !== -1) return "Mac OS";
  if (platform.indexOf("Linux") !== -1) return "Linux";
  if (platform.indexOf("iPhone") !== -1) return "iOS";
  if (platform.indexOf("Android") !== -1) return "Android";
  if (platform.indexOf("iPad") !== -1) return "iPad";
  return "Unknown";
}
