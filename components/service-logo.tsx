import type { IconType } from "react-icons";
import * as ReactIcons from "react-icons/si";

interface ServiceLogoProps {
  name: string;
  slug?: string;
  size?: number;
}

export function ServiceLogo({ name, slug, size = 16 }: ServiceLogoProps) {
  // If no slug is provided, show fallback
  if (!slug) {
    return <Fallback name={name} size={size} />;
  }

  // Try to get icon from react-icons (Simple Icons set)
  // Convert slug to PascalCase with Si prefix (e.g., "stripe" -> "SiStripe")
  const iconKey = `Si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const Icon = ReactIcons[iconKey as keyof typeof ReactIcons] as
    | IconType
    | undefined;

  // If icon not found, show fallback
  if (!Icon) {
    return <Fallback name={name} size={size} />;
  }

  return <Icon size={size} className="shrink-0" />;
}

function Fallback({ name, size }: { name: string; size: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-sm bg-neutral-200 font-medium text-neutral-700"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
