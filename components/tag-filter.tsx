import { ServiceLogo } from "components/service-logo";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  getSlugFromName,
  POPULAR_DATABASES,
  POPULAR_HOSTING,
  POPULAR_SERVICES
} from "lib/service-data";
import { cn } from "lib/utils";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface TagFilterProps {
  tags: {
    services: string[];
    databases: string[];
    hosting: string[];
  };
  activeFilters: {
    service?: string;
    database?: string;
    hosting?: string;
  };
  onFilterChange: (
    type: "service" | "database" | "hosting",
    value: string | undefined
  ) => void;
}

export function TagFilter({
  tags,
  activeFilters,
  onFilterChange
}: TagFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function selectFilter(
    type: "service" | "database" | "hosting",
    value: string
  ) {
    onFilterChange(type, value);
    setOpenDropdown(null);
  }

  function clearFilter(type: "service" | "database" | "hosting") {
    onFilterChange(type, undefined);
  }

  const hasAnyTags =
    tags.services.length > 0 ||
    tags.databases.length > 0 ||
    tags.hosting.length > 0;

  if (!hasAnyTags) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {tags.services.length > 0 && (
        <Popover
          open={openDropdown === "services"}
          onOpenChange={open => setOpenDropdown(open ? "services" : null)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-1.5 text-sm font-normal",
                activeFilters.service
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              )}
            >
              {activeFilters.service ? (
                <>
                  <ServiceLogo
                    name={activeFilters.service}
                    slug={getSlugFromName(
                      activeFilters.service,
                      POPULAR_SERVICES
                    )}
                    size={14}
                  />
                  <span className="max-w-[120px] truncate">
                    {activeFilters.service}
                  </span>
                  <X
                    className="ml-1 h-3.5 w-3.5 opacity-70 hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation();
                      clearFilter("service");
                    }}
                  />
                </>
              ) : (
                <>
                  Services
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="flex flex-col gap-1">
              {tags.services.map(service => (
                <button
                  key={service}
                  onClick={() => selectFilter("service", service)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-neutral-100",
                    activeFilters.service === service && "bg-blue-50"
                  )}
                >
                  <ServiceLogo
                    name={service}
                    slug={getSlugFromName(service, POPULAR_SERVICES)}
                    size={16}
                  />
                  {service}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
      {tags.databases.length > 0 && (
        <Popover
          open={openDropdown === "databases"}
          onOpenChange={open => setOpenDropdown(open ? "databases" : null)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-1.5 text-sm font-normal",
                activeFilters.database
                  ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              )}
            >
              {activeFilters.database ? (
                <>
                  <ServiceLogo
                    name={activeFilters.database}
                    slug={getSlugFromName(
                      activeFilters.database,
                      POPULAR_DATABASES
                    )}
                    size={14}
                  />
                  <span className="max-w-[120px] truncate">
                    {activeFilters.database}
                  </span>
                  <X
                    className="ml-1 h-3.5 w-3.5 opacity-70 hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation();
                      clearFilter("database");
                    }}
                  />
                </>
              ) : (
                <>
                  Databases
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="flex flex-col gap-1">
              {tags.databases.map(db => (
                <button
                  key={db}
                  onClick={() => selectFilter("database", db)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-neutral-100",
                    activeFilters.database === db && "bg-green-50"
                  )}
                >
                  <ServiceLogo
                    name={db}
                    slug={getSlugFromName(db, POPULAR_DATABASES)}
                    size={16}
                  />
                  {db}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
      {tags.hosting.length > 0 && (
        <Popover
          open={openDropdown === "hosting"}
          onOpenChange={open => setOpenDropdown(open ? "hosting" : null)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-1.5 text-sm font-normal",
                activeFilters.hosting
                  ? "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              )}
            >
              {activeFilters.hosting ? (
                <>
                  <ServiceLogo
                    name={activeFilters.hosting}
                    slug={getSlugFromName(
                      activeFilters.hosting,
                      POPULAR_HOSTING
                    )}
                    size={14}
                  />
                  <span className="max-w-[120px] truncate">
                    {activeFilters.hosting}
                  </span>
                  <X
                    className="ml-1 h-3.5 w-3.5 opacity-70 hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation();
                      clearFilter("hosting");
                    }}
                  />
                </>
              ) : (
                <>
                  Hosting
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="flex flex-col gap-1">
              {tags.hosting.map(host => (
                <button
                  key={host}
                  onClick={() => selectFilter("hosting", host)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-neutral-100",
                    activeFilters.hosting === host && "bg-purple-50"
                  )}
                >
                  <ServiceLogo
                    name={host}
                    slug={getSlugFromName(host, POPULAR_HOSTING)}
                    size={16}
                  />
                  {host}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
