import Image from "next/legacy/image";
import Link from "next/link";
import { postsQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import { toPlainText } from "@portabletext/react";

const fallbackImage = "https://res.cloudinary.com/sergeivas/image/upload/v1692608339/sergeivas/blog.png";

// Определяем интерфейс для пропсов
interface PostsProps {
  max?: number;
  min?: string;
  fax?: number;
}

// Изменяем компонент, чтобы он принимал пропс `max`
const Posts = async ({ max }:PostsProps) => {
  const fetchedPosts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  // Определяем, сколько постов отображать, используя `max`
  const postsToShow = max ? fetchedPosts.slice(0, max) : fetchedPosts;

  return (
    <section>
      {postsToShow.length > 0 ? (
        <div className="flex flex-col gap-y-12 lg:gap-y-8 mb-12 max-w-full lg:max-w-[950px]">
          {postsToShow.map((post) =>
            post.isPublished !== true ? null : (
              <article key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex lg:flex-row flex-col items-start lg:items-center gap-8 border-zinc-200 dark:border-zinc-800 bg-secondary-bg dark:bg-primary-bg p-6 border rounded-lg group"
                >
                    <div className="relative w-full lg:w-[450px] h-56 lg:h-52 overflow-clip">
                      <Image
                        src={post.coverImage?.image || fallbackImage}
                        className="group-hover:scale-125 bg-zinc-100 dark:bg-zinc-800 rounded-md duration-300 object-cover"
                        alt={post.coverImage?.alt || post.title}
                        layout="fill"
                        placeholder={post.coverImage ? "blur" : "empty"}
                        blurDataURL={post.coverImage?.lqip || ""}
                      />
                    </div>
                    <div className="max-w-lg">
                      <h2 className="mb-4 font-semibold text-2xl tracking-tight">{post.title}</h2>
                      <p className="text-[0.95rem] text-zinc-600 dark:text-zinc-400">{post.description}</p>
                      <div className="flex items-center gap-x-4 mt-3 text-sm">
                        <HiCalendar />
                        <time dateTime={post.date || post._createdAt}>{formatDate(post.date || post._createdAt)}</time>
                        <BiSolidTime />
                        <span>{post.body ? readTime(toPlainText(post.body)) : 'No Data.'}</span>
                      </div>
                    </div>
                </Link>
              </article>
            )
          )}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
    
  );
  <div>aaaa</div>
};

export default Posts;
