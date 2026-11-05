export type AuthExample = {
  id: number;
  title: string;
  layout: "centered" | "framed" | "split";
  mode: "password" | "magic-link" | "method-picker";
  providers?: ("google" | "apple")[];
  socialLayout?: "vertical";
};

export const authExamples: AuthExample[] = [
  { id: 20, title: "Password Sign-In", layout: "centered", mode: "password", providers: ["google", "apple"] },
  { id: 15, title: "Magic Link · Stacked Social Buttons", layout: "framed", mode: "magic-link", providers: ["google", "apple"], socialLayout: "vertical" },
  { id: 17, title: "Split Method Picker", layout: "split", mode: "method-picker" },
];
