/** Return a deterministic DiceBear avatar URL for demo people. */
export function demoAvatarUrl(seed: string | number) {
  return `https://api.dicebear.com/10.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}
