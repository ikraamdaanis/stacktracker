import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card";
import type { Doc } from "convex/_generated/dataModel";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: Doc<"projects">;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:border-neutral-400">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-black">
              {project.name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-neutral-600">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-600 hover:text-black"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-600 hover:text-red-600"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {project.services.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">
              Services
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.services.map(service => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {project.databases.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">
              Databases
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.databases.map(db => (
                <Badge
                  key={db}
                  variant="secondary"
                  className="bg-green-50 text-green-700 hover:bg-green-100"
                >
                  {db}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {project.hosting.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">
              Hosting
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.hosting.map(host => (
                <Badge
                  key={host}
                  variant="secondary"
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                >
                  {host}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {project.monthlyCost !== undefined && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="font-medium">Cost:</span>
            <span>${project.monthlyCost.toFixed(2)}/mo</span>
          </div>
        )}
        {project.dashboardUrl && (
          <a
            href={project.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-blue-600 transition-colors hover:text-blue-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Dashboard
          </a>
        )}
      </CardContent>
    </Card>
  );
}
