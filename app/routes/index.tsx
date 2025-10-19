import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "components/project-card";
import { ProjectDialog } from "components/project-dialog";
import { SearchBar } from "components/search-bar";
import { TagFilter } from "components/tag-filter";
import { Button } from "components/ui/button";
import { api } from "convex/_generated/api";
import type { Doc } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App
});

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<
    Doc<"projects"> | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    service?: string;
    database?: string;
    hosting?: string;
  }>({});

  const allProjects = useQuery(api.projects.getProjects);
  const allTags = useQuery(api.projects.getAllTags);
  const deleteProject = useMutation(api.projects.deleteProject);

  const filteredProjects = allProjects?.filter((project: Doc<"projects">) => {
    const matchesSearch =
      !searchTerm ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService =
      !activeFilters.service ||
      project.services.some(s => s.name === activeFilters.service);

    const matchesDatabase =
      !activeFilters.database ||
      project.databases.some(d => d.name === activeFilters.database);

    const matchesHosting =
      !activeFilters.hosting ||
      project.hosting.some(h => h.name === activeFilters.hosting);

    return matchesSearch && matchesService && matchesDatabase && matchesHosting;
  });

  function handleFilterChange(
    type: "service" | "database" | "hosting",
    value: string | undefined
  ) {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  }

  function handleEdit(project: Doc<"projects">) {
    setEditingProject(project);
    setIsDialogOpen(true);
  }

  function handleDelete(projectId: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject({ id: projectId as Doc<"projects">["_id"] });
    }
  }

  function handleAddNew() {
    setEditingProject(undefined);
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
    setEditingProject(undefined);
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex flex-col gap-6 border-b border-zinc-300 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-black">StackTracker</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Track services, databases, and hosting across your projects
            </p>
          </div>
        </div>
      </div>
      <section className="h-full bg-[#FAFAFA] p-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              {allTags && (
                <TagFilter
                  tags={allTags}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
            <Button
              onClick={handleAddNew}
              size="sm"
              className="bg-black text-white hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
          {!allProjects ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-neutral-600">Loading...</div>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid gap-4 bg-[#FAFAFA] sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project: Doc<"projects">) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={() => handleEdit(project)}
                  onDelete={() => handleDelete(project._id)}
                />
              ))}
            </div>
          ) : allProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-12">
              <p className="text-lg font-medium text-neutral-700">
                No projects yet
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Get started by adding your first project
              </p>
              <Button
                onClick={handleAddNew}
                className="mt-4 bg-black text-white hover:bg-neutral-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-12">
              <p className="text-lg font-medium text-neutral-700">
                No results found
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        project={editingProject}
      />
    </div>
  );
}
