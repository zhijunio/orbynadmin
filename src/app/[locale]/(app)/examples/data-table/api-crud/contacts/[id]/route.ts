import { NextResponse } from "next/server";
import { contactInputSchema } from "@/app/[locale]/(app)/examples/data-table/api-crud/contacts-data";
import { getContact, removeContact, updateContact } from "@/app/[locale]/(app)/examples/data-table/api-crud/contacts-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const contact = getContact(id);
  if (!contact) return NextResponse.json({ error: "Contact not found." }, { status: 404 });
  return NextResponse.json({ data: contact });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body: unknown = await request.json().catch(() => null);
  const result = contactInputSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = updateContact(id, result.data);
  if ("error" in updated) {
    const status = updated.error === "Contact not found." ? 404 : 409;
    return NextResponse.json({ error: updated.error }, { status });
  }
  return NextResponse.json({ data: updated.contact });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!removeContact(id)) {
    return NextResponse.json({ error: "Contact not found." }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
