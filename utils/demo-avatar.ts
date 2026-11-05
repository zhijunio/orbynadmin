/** Return a stable RandomUser portrait URL for demo people. */
export function demoAvatarUrl(seed: string | number) {
  const hash = String(seed).split("").reduce((value, char) => (value * 31 + char.charCodeAt(0)) | 0, 0);
  const index = Math.abs(hash % 100);
  const gender = hash % 2 === 0 ? "women" : "men";
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}
