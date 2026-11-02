

import { AuthPageLayout } from "@/components/application/auth/auth-page-layout";
import type { Metadata } from "next";

import { ForgotPasswordCard } from "@/components/application/auth/account-flow-cards";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return <AuthPageLayout>{<ForgotPasswordCard standalone />}</AuthPageLayout>;
}
