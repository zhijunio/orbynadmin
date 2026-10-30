import { NextResponse } from "next/server";
import { contactInputSchema } from "@/app/[locale]/(app)/examples/data-table/api-crud/contacts-data";
import { createContact, listContacts } from "@/app/[locale]/(app)/examples/data-table/api-crud/contacts-store";

export const dynamic = "force-dynamic";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await wait(250);
  return NextResponse.json({ data: listContacts() });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const result = contactInputSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const created = createContact(result.data);
  if ("error" in created) {
    return NextResponse.json({ error: created.error }, { status: 409 });
  }
  return NextResponse.json({ data: created.contact }, { status: 201 });
}
