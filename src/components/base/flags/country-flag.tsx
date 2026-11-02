import type { ComponentType } from "react";
import { AU, BE, BR, CA, CN, DE, EG, FI, FR, GB, IN, IT, JP, SG, TR, US } from "country-flag-icons/react/3x2";

const flags = { AU, BE, BR, CA, CN, DE, EG, FI, FR, GB, IN, IT, JP, SG, TR, US };

export type CountryCode = keyof typeof flags;

type Flag = ComponentType<Parameters<typeof US>[0]>;

export function CountryFlag({ country, className, title }: { country: string; className?: string; title?: string }) {
  if (!Object.hasOwn(flags, country)) return null;
  const FlagIcon = flags[country as CountryCode] as Flag;

  return <FlagIcon aria-hidden={title ? undefined : true} className={className} title={title} />;
}
