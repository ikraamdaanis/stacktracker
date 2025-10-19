import { useForm } from "@tanstack/react-form";
import { TagInput } from "components/tag-input";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import type { Id } from "convex/_generated/dataModel";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  services: z.array(z.string()),
  databases: z.array(z.string()),
  hosting: z.array(z.string()),
  dashboardUrl: z.string().optional(),
  monthlyCost: z.number().optional(),
  notes: z.string().optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: ProjectFormData & { id?: Id<"projects"> };
  onSubmit: (data: ProjectFormData & { id?: Id<"projects"> }) => void;
  onCancel: () => void;
}

export function ProjectForm({
  initialData,
  onSubmit,
  onCancel
}: ProjectFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      services: initialData?.services ?? [],
      databases: initialData?.databases ?? [],
      hosting: initialData?.hosting ?? [],
      dashboardUrl: initialData?.dashboardUrl ?? "",
      monthlyCost: initialData?.monthlyCost ?? undefined,
      notes: initialData?.notes ?? ""
    },
    onSubmit: ({ value }) => {
      const data: ProjectFormData & { id?: Id<"projects"> } = {
        name: value.name,
        description: value.description,
        services: value.services,
        databases: value.databases,
        hosting: value.hosting,
        dashboardUrl: value.dashboardUrl || undefined,
        monthlyCost: value.monthlyCost || undefined,
        notes: value.notes || undefined
      };
      if (initialData?.id) {
        data.id = initialData.id;
      }
      onSubmit(data);
    }
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="name"
        validators={{
          onChange: projectSchema.shape.name
        }}
      >
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="My Awesome Project"
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-sm text-red-500">
                {String(field.state.meta.errors[0])}
              </span>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name="description"
        validators={{
          onChange: projectSchema.shape.description
        }}
      >
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="A brief description of your project"
              rows={3}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-sm text-red-500">
                {String(field.state.meta.errors[0])}
              </span>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="services">
        {field => (
          <div className="flex flex-col gap-2">
            <Label>Services</Label>
            <TagInput
              value={field.state.value}
              onChange={tags => field.handleChange(tags)}
              placeholder="e.g., Stripe, SendGrid, Clerk"
            />
          </div>
        )}
      </form.Field>
      <form.Field name="databases">
        {field => (
          <div className="flex flex-col gap-2">
            <Label>Databases</Label>
            <TagInput
              value={field.state.value}
              onChange={tags => field.handleChange(tags)}
              placeholder="e.g., PostgreSQL, MongoDB, Redis"
            />
          </div>
        )}
      </form.Field>
      <form.Field name="hosting">
        {field => (
          <div className="flex flex-col gap-2">
            <Label>Hosting / Deployment</Label>
            <TagInput
              value={field.state.value}
              onChange={tags => field.handleChange(tags)}
              placeholder="e.g., Vercel, Railway, AWS"
            />
          </div>
        )}
      </form.Field>
      <form.Field name="dashboardUrl">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="dashboardUrl">Dashboard URL</Label>
            <Input
              id="dashboardUrl"
              type="url"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="https://..."
            />
          </div>
        )}
      </form.Field>
      <form.Field name="monthlyCost">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="monthlyCost">Monthly Cost ($)</Label>
            <Input
              id="monthlyCost"
              type="number"
              step="0.01"
              value={field.state.value ?? ""}
              onChange={e =>
                field.handleChange(
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
              placeholder="0.00"
            />
          </div>
        )}
      </form.Field>
      <form.Field name="notes">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>
        )}
      </form.Field>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  );
}
