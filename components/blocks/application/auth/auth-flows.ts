export type AuthFlow = {
  slug: "signup" | "forgot-password" | "reset-password";
  cardTitle: string;
  title: string;
  description?: string;
};

export const authFlows: AuthFlow[] = [
  { slug: "signup", cardTitle: "Create account", title: "Create an account" },
  { slug: "forgot-password", cardTitle: "Forgot password", title: "Reset your password", description: "Enter your work email and we’ll send a reset link if an account matches." },
  { slug: "reset-password", cardTitle: "Reset password", title: "Choose a new password" },
];
