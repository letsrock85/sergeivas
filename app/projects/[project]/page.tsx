import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";

type Props = {
  params: Promise<{
    project: string;
  }>;
};

const fallbackImage: string =
  "https://res.cloudinary.com/sergeivas/image/upload/v1692636087/sergeivas/projects.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: slug } = await params;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`https://sergeivas.com/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images:
        urlFor(project.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `https://sergeivas.com/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const { project: slug } = await params;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="mx-auto px-8 lg:px-16 max-w-6xl">
      <Slide>
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-between items-start mb-4">
            <h1 className="mb-4 max-w-sm font-black font-incognito text-3xl sm:text-5xl tracking-tight">
              {project.name}
            </h1>

            <a
              href={project.projectUrl}
              rel="noreferrer noopener"
              target="_blank"
              className={`dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 ${
                !project.projectUrl
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer hover:border-zinc-700"
              }`}
            >
              {project.projectUrl ? "Explore" : "Coming Soon"}
            </a>
          </div>

          <div className="relative pt-[52.5%] w-full h-40">
            <Image
              className="border-zinc-100 dark:border-zinc-800 border rounded-xl object-cover"
              layout="fill"
              src={project.coverImage?.image || fallbackImage}
              alt={project.coverImage?.alt || project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          <div className="mt-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>
        </div>
      </Slide>
    </main>
  );
}
