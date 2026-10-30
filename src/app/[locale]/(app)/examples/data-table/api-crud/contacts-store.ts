import type { Contact, ContactInput } from "./contacts-data";

type ContactStore = { contacts: Contact[]; nextId: number };

const globalStore = globalThis as typeof globalThis & {
  __orbynadminDemoContactsStore?: ContactStore;
};

const store = globalStore.__orbynadminDemoContactsStore ??= {
  contacts: [
  { id: "CON-1001", name: "Avery Chen", email: "avery.chen@example.com", role: "Admin", status: "Active", createdAt: "2026-09-12T09:00:00.000Z" },
  { id: "CON-1002", name: "Jordan Rivera", email: "jordan.rivera@example.com", role: "Editor", status: "Active", createdAt: "2026-09-15T12:30:00.000Z" },
  { id: "CON-1003", name: "Samira Patel", email: "samira.patel@example.com", role: "Viewer", status: "Invited", createdAt: "2026-09-18T15:15:00.000Z" },
  { id: "CON-1004", name: "Noah Williams", email: "noah.williams@example.com", role: "Editor", status: "Active", createdAt: "2026-09-22T08:45:00.000Z" },
  { id: "CON-1005", name: "Mina Okafor", email: "mina.okafor@example.com", role: "Viewer", status: "Invited", createdAt: "2026-09-25T10:20:00.000Z" },
  { id: "CON-1006", name: "Leo Martin", email: "leo.martin@example.com", role: "Admin", status: "Active", createdAt: "2026-09-28T16:05:00.000Z" },
  { id: "CON-1007", name: "Priya Shah", email: "priya.shah@example.com", role: "Editor", status: "Active", createdAt: "2026-10-01T11:40:00.000Z" },
  { id: "CON-1008", name: "Ethan Kim", email: "ethan.kim@example.com", role: "Viewer", status: "Invited", createdAt: "2026-10-04T14:10:00.000Z" },
  ],
  nextId: 1009,
};

export function listContacts() {
  return [...store.contacts];
}

export function getContact(id: string) {
  return store.contacts.find((contact) => contact.id === id);
}

export function createContact(input: ContactInput) {
  const normalizedEmail = input.email.toLowerCase();
  if (store.contacts.some((contact) => contact.email.toLowerCase() === normalizedEmail)) {
    return { error: "A contact with this email already exists." } as const;
  }

  const contact: Contact = {
    ...input,
    email: normalizedEmail,
    id: `CON-${store.nextId++}`,
    createdAt: new Date().toISOString(),
  };
  store.contacts = [contact, ...store.contacts];
  return { contact } as const;
}

export function updateContact(id: string, input: ContactInput) {
  const index = store.contacts.findIndex((contact) => contact.id === id);
  if (index < 0) return { error: "Contact not found." } as const;

  const normalizedEmail = input.email.toLowerCase();
  if (store.contacts.some((contact) => contact.id !== id && contact.email.toLowerCase() === normalizedEmail)) {
    return { error: "A contact with this email already exists." } as const;
  }

  const contact: Contact = { ...store.contacts[index], ...input, email: normalizedEmail };
  store.contacts = store.contacts.map((item) => item.id === id ? contact : item);
  return { contact } as const;
}

export function removeContact(id: string) {
  const contact = getContact(id);
  if (!contact) return false;
  store.contacts = store.contacts.filter((item) => item.id !== id);
  return true;
}
