import { ProjectForm } from "components/project-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "components/ui/dialog";
import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Doc<"projects">;
}

export function ProjectDialog({
  open,
  onOpenChange,
  project
}: ProjectDialogProps) {
  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);

  async function handleSubmit(
    data: {
      name: string;
      description: string;
      services: string[];
      databases: string[];
      hosting: string[];
      dashboardUrl?: string;
      monthlyCost?: number;
      notes?: string;
    } & { id?: Id<"projects"> }
  ) {
    if (data.id) {
      await updateProject({
        id: data.id,
        name: data.name,
        description: data.description,
        services: data.services,
        databases: data.databases,
        hosting: data.hosting,
        dashboardUrl: data.dashboardUrl,
        monthlyCost: data.monthlyCost,
        notes: data.notes
      });
    } else {
      await createProject({
        name: data.name,
        description: data.description,
        services: data.services,
        databases: data.databases,
        hosting: data.hosting,
        dashboardUrl: data.dashboardUrl,
        monthlyCost: data.monthlyCost,
        notes: data.notes
      });
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {project
              ? "Update your project information"
              : "Add a new project to track its services, databases, and hosting"}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
