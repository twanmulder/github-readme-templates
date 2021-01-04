export function decodeFromBase64ToUTF8(encodedString) {
  return decodeURIComponent(
    atob(encodedString)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
