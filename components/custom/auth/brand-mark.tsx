import Image from "next/image";

export function BrandMark({ size = "default" }: { size?: "tiny" | "small" | "default" }) {
  const dimension = size === "tiny" ? 16 : size === "small" ? 32 : 40;

  return (
    <Image
      src="/favicon.ico"
      alt=""
      width={dimension}
      height={dimension}
      unoptimized
      className="shrink-0 rounded-lg"
      aria-hidden="true"
    />
  );
}
