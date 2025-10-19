import { ServiceLogo } from "components/service-logo";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "components/ui/command";
import { Input } from "components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import type { ServiceOption } from "lib/service-data";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

export interface ServiceWithUrl {
  name: string;
  url?: string;
}

interface SearchableMultiSelectProps {
  value: ServiceWithUrl[];
  onChange: (value: ServiceWithUrl[]) => void;
  options: ServiceOption[];
  placeholder?: string;
  label?: string;
}

export function SearchableMultiSelect({
  value,
  onChange,
  options,
  placeholder = "Search...",
  label = "Select items"
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function toggleItem(itemName: string) {
    const exists = value.some(v => v.name === itemName);
    const newValue = exists
      ? value.filter(v => v.name !== itemName)
      : [...value, { name: itemName }];
    onChange(newValue);
  }

  function removeItem(itemName: string) {
    onChange(value.filter(v => v.name !== itemName));
  }

  function updateItemUrl(itemName: string, url: string) {
    onChange(
      value.map(v =>
        v.name === itemName ? { ...v, url: url || undefined } : v
      )
    );
  }

  function addCustomItem() {
    const trimmed = searchValue.trim();
    if (trimmed && !value.some(v => v.name === trimmed)) {
      onChange([...value, { name: trimmed }]);
      setOpen(false);

      setTimeout(() => {
        setSearchValue("");
      }, 500);
    }
  }

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectedOptions = value.filter(v =>
    options.some(opt => opt.name === v.name)
  );

  const customItems = value.filter(
    v => !options.some(opt => opt.name === v.name)
  );

  const isCustomSearch =
    searchValue.trim() &&
    !options.some(opt => opt.name.toLowerCase() === searchValue.toLowerCase());

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-9 justify-between"
            size="sm"
          >
            {value.length === 0 ? label : `${value.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                {isCustomSearch ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <p className="text-sm text-neutral-600">No results found</p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={addCustomItem}
                    >
                      Add &quot;{searchValue}&quot; as custom
                    </Button>
                  </div>
                ) : (
                  <p className="py-6 text-center text-sm text-neutral-600">
                    No results found.
                  </p>
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map(option => {
                  const isSelected = value.some(v => v.name === option.name);
                  return (
                    <CommandItem
                      key={option.name}
                      value={option.name}
                      onSelect={() => toggleItem(option.name)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={isSelected}
                        className="pointer-events-none"
                      />
                      <ServiceLogo
                        name={option.name}
                        slug={option.slug}
                        size={20}
                      />
                      <span className="flex-1">{option.name}</span>
                      <span className="text-xs text-neutral-500">
                        {option.category}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-neutral-600" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-col gap-2">
          {selectedOptions.map(item => {
            const option = options.find(opt => opt.name === item.name);
            return (
              <div key={item.name} className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 bg-neutral-100 pr-1 text-neutral-700"
                >
                  <ServiceLogo name={item.name} slug={option?.slug} size={14} />
                  {item.name}
                  <button
                    type="button"
                    onClick={() => removeItem(item.name)}
                    className="ml-1 rounded-sm hover:bg-neutral-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={item.url || ""}
                  onChange={e => updateItemUrl(item.name, e.target.value)}
                  className="h-7 flex-1 text-sm"
                />
              </div>
            );
          })}
          {customItems.map(item => (
            <div key={item.name} className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 bg-neutral-100 pr-1 text-neutral-700"
              >
                <ServiceLogo name={item.name} size={14} />
                {item.name}
                <button
                  type="button"
                  onClick={() => removeItem(item.name)}
                  className="ml-1 rounded-sm hover:bg-neutral-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <Input
                type="url"
                placeholder="https://..."
                value={item.url || ""}
                onChange={e => updateItemUrl(item.name, e.target.value)}
                className="h-7 flex-1 text-sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
