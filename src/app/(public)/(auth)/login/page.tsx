

import { AuthPageLayout } from "@/components/application/auth/auth-page-layout";
import type { Metadata } from "next";

import { SignInCard } from "@/components/application/auth/sign-in-layout-cards";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return <AuthPageLayout>{<SignInCard standalone />}</AuthPageLayout>;
}
