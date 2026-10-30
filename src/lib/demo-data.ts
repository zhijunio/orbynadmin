import { demoAvatarUrl } from "@/lib/demo-avatar";

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "Lucas", "Mia", "Aiden", "Harper", "James", "Ella", "Benjamin", "Amelia", "Elijah", "Chloe", "Daniel"];

const lastNames = ["Carter", "Reyes", "Nguyen", "Patel", "Kim", "Brooks", "Silva", "Novak", "Haddad", "Rossi", "Weber", "Costa", "Fischer", "Muller", "Ivanov", "Sato", "Cohen", "Bauer", "Lopez", "Dubois"];

export type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  status: "Active" | "Inactive" | "Pending";
  plan: "Free" | "Pro" | "Enterprise";
  spent: number;
  location: string;
  joined: string;
};

const companies = ["Vertex Labs", "Northwind", "Lumen Co", "Aperture", "Blue Harbor", "Sunroot", "Kite Digital", "Foundry", "Meridian", "Ironclad", "Wavelength", "Silverpeak"];

const locations = ["San Francisco, US", "London, UK", "Berlin, DE", "Toronto, CA", "Sydney, AU", "Tokyo, JP", "Paris, FR", "Austin, US", "Amsterdam, NL", "Singapore, SG"];

const plans: Customer["plan"][] = ["Free", "Pro", "Enterprise"];

const statuses: Customer["status"][] = ["Active", "Inactive", "Pending"];

export const customers: Customer[] = Array.from({ length: 48 }, (_, i) => {
  const first = pick(firstNames, i * 3);
  const last = pick(lastNames, i * 5 + 2);
  const name = `${first} ${last}`;
  return {
    id: `CUS-${(1042 + i).toString()}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${pick(companies, i).toLowerCase().replace(/\s/g, "")}.com`,
    avatar: demoAvatarUrl(i),
    company: pick(companies, i),
    status: pick(statuses, i + (i % 4)),
    plan: pick(plans, i + (i % 3)),
    spent: 480 + ((i * 137) % 9200),
    location: pick(locations, i * 2),
    joined: new Date(2024, i % 12, ((i * 7) % 27) + 1).toISOString().slice(0, 10),
  };
});
