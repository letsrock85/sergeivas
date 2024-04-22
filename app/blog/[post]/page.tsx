import Image from "next/legacy/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PostType } from "@/types";
import { singlePostQuery } from "@/lib/sanity.query";
import { PortableText, toPlainText } from "@portabletext/react";
import { CustomPortableText } from "../../components/shared/CustomPortableText";
import { BiChevronRight, BiSolidTime, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import SharePost from "../../components/shared/SharePost";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import Buymeacoffee from "@/app/components/shared/Buymeacoffee";
import Comments from "@/app/components/shared/Comments";
import { HiCalendar, HiChat } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import PageHeading from "@/app/components/shared/PageHeading";

type Props = {
  params: {
    post: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/sergeivas/image/upload/v1692636087/sergeivas/blog.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title}`,
    metadataBase: new URL(`https://sergeivas.com/blog/${post.slug}`),
    description: post.description,
    publisher: post.author.name,
    keywords: post.tags,
    alternates: {
      canonical:
        post.canonicalLink || `https://sergeivas.com/blog/${post.slug}`,
    },
    openGraph: {
      images:
        urlFor(post.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `https://sergeivas.com/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      siteName: "sergeivas.com",
      authors: post.author.name,
      tags: post.tags,
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images:
        urlFor(post.coverImage?.image).width(680).height(340).url() ||
        fallbackImage,
      creator: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      site: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      card: "summary_large_image",
    },
  };
}

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  const words = post.body ? toPlainText(post.body) : 'No Data.';

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto px-6 md:px-16 max-w-7xl">
      <header>
        <Slide className="relative flex items-center gap-x-2 border-zinc-200 dark:border-zinc-800 pb-8 border-b">
          <Link
            href="/blog"
            className="border-zinc-200 dark:border-zinc-700 border-b text-sm text-zinc-400 hover:dark:text-white hover:text-zinc-700 dark:text-zinc-400 whitespace-nowrap"
          >
            cd ..
          </Link>
          <BiChevronRight />
          <p className="text-sm text-zinc-400 truncate">{post.title}</p>
        </Slide>
      </header>

      <article>
        <Slide className="relative flex lg:flex-row flex-col" delay={0.1}>
          <div className="border-zinc-200 dark:border-zinc-800 px-0 pt-10 lg:pr-6 pb-4 border-r-0 lg:border-r min-h-full basis-3/4">
            <div className="flex flex-wrap items-center gap-4 mb-8 text-md text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <time dateTime={post.date ? post.date : post._createdAt}>
                  {post.date
                    ? formatDate(post.date)
                    : formatDate(post._createdAt)}
                </time>
              </div>
              <Link
                href="#comments"
                className="flex items-center gap-x-2 text-tertiary-color dark:text-primary-color"
              >
                <HiChat />
                <div className="#comments">Comments</div>
              </Link>
              <div className="flex items-center gap-x-2">
                <BiSolidTime />
                <div className="">{readTime(words)}</div>
              </div>
            </div>

            <PageHeading title={post.title} description={post.description} />

            <div className="relative pt-[52.5%] w-full h-40">
              <Image
                className="border-zinc-100 dark:border-zinc-800 border rounded-xl object-cover"
                layout="fill"
                src={post.coverImage?.image || fallbackImage}
                alt={post.coverImage?.alt || post.title}
                quality={100}
                placeholder={post.coverImage?.lqip ? `blur` : "empty"}
                blurDataURL={post.coverImage?.lqip || ""}
              />
            </div>

            <div className="mt-8 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight">
              <PortableText value={post.body} components={CustomPortableText} />
            </div>
          </div>

          <aside className="top-2 right-0 bottom-auto sticky flex flex-col gap-y-8 px-0 lg:px-6 py-10 h-max lg:max-h-full basis-1/4">
            <section className="border-zinc-200 dark:border-zinc-800 pb-10 border-b">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Written By
              </p>
              <address className="flex items-center gap-x-3 mt-4 not-italic">
                <div className="relative w-12 h-12">
                  <Image
                    src={urlFor(post.author.photo.image)
                      .width(80)
                      .height(80)
                      .url()}
                    alt={post.author.photo.alt}
                    layout="fill"
                    className="bg-zinc-300 dark:bg-zinc-800 rounded-full object-cover"
                  />
                </div>
                <div rel="author">
                  <h3 className="font-semibold text-lg tracking-tight">
                    {post.author.name}
                  </h3>
                  <a
                    href={post.author.twitterUrl}
                    className="text-blue-500 text-sm"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {`@${post.author.twitterUrl.split("twitter.com/")[1]}`}
                  </a>
                </div>
              </address>
            </section>

            <section className="border-zinc-200 dark:border-zinc-800 pb-10 border-b">
              <h3 className="mb-4 font-semibold text-xl tracking-tight">
                Tags
              </h3>
              <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                {post.tags.map((tag, id) => (
                  <li
                    key={id}
                    className="border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-primary-bg px-2 py-1 border rounded-md text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            <SharePost
              title={post.title}
              slug={post.slug}
              description={post.description}
            />

            <section className="border-zinc-200 dark:border-zinc-800 pb-10 border-b">
              <h3 className="mb-4 font-semibold text-xl tracking-tight">
                Featured
              </h3>
              <FeaturedPosts params={params.post} />
            </section>
          </aside>
        </Slide>
      </article>

      <section
        id="comments"
        className="border-zinc-200 dark:border-zinc-800 mt-10 lg:py-10 pt-0 lg:border-t max-w-3xl"
      >
        <h3 className="mb-8 font-semibold text-3xl lg:text-4xl tracking-tight">
          Comments
        </h3>
        <Comments />
      </section>

      <section className="lg:py-10 pt-0 max-w-3xl">
        <h3 className="mb-8 font-semibold text-3xl lg:text-4xl tracking-tight">
          Support
        </h3>
        <Buymeacoffee />
      </section>
    </main>
  );
}
