import { Badge } from "components/ui/badge";
import { cn } from "lib/utils";

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
  function toggleFilter(
    type: "service" | "database" | "hosting",
    value: string
  ) {
    const currentValue = activeFilters[type];
    onFilterChange(type, currentValue === value ? undefined : value);
  }

  const hasAnyTags =
    tags.services.length > 0 ||
    tags.databases.length > 0 ||
    tags.hosting.length > 0;

  if (!hasAnyTags) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {tags.services.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-neutral-700">Services</h3>
          <div className="flex flex-wrap gap-2">
            {tags.services.map(service => (
              <Badge
                key={service}
                variant="secondary"
                className={cn(
                  "cursor-pointer transition-colors",
                  activeFilters.service === service
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => toggleFilter("service", service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {tags.databases.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-neutral-700">Databases</h3>
          <div className="flex flex-wrap gap-2">
            {tags.databases.map(db => (
              <Badge
                key={db}
                variant="secondary"
                className={cn(
                  "cursor-pointer transition-colors",
                  activeFilters.database === db
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                )}
                onClick={() => toggleFilter("database", db)}
              >
                {db}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {tags.hosting.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-neutral-700">Hosting</h3>
          <div className="flex flex-wrap gap-2">
            {tags.hosting.map(host => (
              <Badge
                key={host}
                variant="secondary"
                className={cn(
                  "cursor-pointer transition-colors",
                  activeFilters.hosting === host
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                )}
                onClick={() => toggleFilter("hosting", host)}
              >
                {host}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
