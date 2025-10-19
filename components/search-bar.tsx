import { Input } from "components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      <Input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pr-10 pl-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
