import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Project | Sergei Vas",
  metadataBase: new URL("https://sergeivas.com/projects"),
  description: "Explore projects built by Sergei Vas",
  openGraph: {
    title: "Projects | Sergei Vas",
    url: "https://sergeivas.com/projects",
    description: "Explore projects built by Sergei Vas",
    images:
      "https://res.cloudinary.com/sergeivas/image/upload/v1692636087/sergeivas/projects.png",
  },
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="mx-auto px-6 md:px-16 max-w-7xl">
      <PageHeading
        title="Projects"
        description="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-12">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="flex items-center gap-x-4 dark:hover:border-zinc-700 hover:border-zinc-200 bg-zinc-50 dark:bg-primary-bg p-4 border border-transparent rounded-lg"
              >
                <Image
                  src={project.logo}
                  width={60}
                  height={60}
                  alt={project.name}
                  className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md"
                />
                <div>
                  <h2 className="mb-1 text-lg tracking-wide">{project.name}</h2>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {project.tagline}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
