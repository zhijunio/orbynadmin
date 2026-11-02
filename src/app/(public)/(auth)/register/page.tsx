

import { AuthPageLayout } from "@/components/application/auth/auth-page-layout";
import type { Metadata } from "next";

import { SignUpCard } from "@/components/application/auth/account-flow-cards";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return <AuthPageLayout>{<SignUpCard standalone />}</AuthPageLayout>;
}
