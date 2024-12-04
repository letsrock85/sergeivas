import { heroesQuery } from "@/lib/sanity.query";
import { HeroeType } from "@/types";
import EasterEgg from "../shared/EasterEgg";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Heroes() {
  const heroes: HeroeType[] = await sanityFetch({
    query: heroesQuery,
    tags: ["heroe"],
  });

  return (
    <section className="mt-32 max-w-5xl">
      <Slide delay={0.17}>
        <h2 className="mb-4 font-bold text-4xl tracking-tight">Heroes</h2>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          {/* Inspired by{" "}
          <a
            href="https://rafa.design"
            rel="noreferrer noopener"
            target="_blank"
            className="text-blue-500 dark:text-blue-400 underline"
          >
            Rafael Conde&apos;s
          </a>{" "}
          heroes list, here&apos;s my  */}
          My own curated lineup of code conjurers and digital dynamos that I&apos;m absolutely stoked to meet someday.{" "}
          <strong className="font-semibold">
            &quot;In no particular order&quot;
          </strong>
        </p>
      </Slide>

      <ul className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 tracking-tight">
        {heroes.map((heroe) => (
          <li
            key={heroe._id}
            className="flex items-center gap-x-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-primary-bg px-2 py-1 border rounded-md"
          >
            <EasterEgg isMet={heroe.met} />
            <a
              href={heroe.url}
              rel="noreferrer noopener"
              target="_blank"
              className={`font-incognito tracking-wide hover:underline ${
                heroe.met ? "dark:text-green-300 text-green-800" : null
              }`}
            >
              {heroe.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
