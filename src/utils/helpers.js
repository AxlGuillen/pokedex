export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatNumber(id) {
  return id ? id.toString().padStart(4, "0") : "----";
}
