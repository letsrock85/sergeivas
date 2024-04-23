import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Home() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="mx-auto mt-20 lg:mt-32 px-6 md:px-16 max-w-7xl">
      <section className="flex xl:flex-row flex-col justify-between xl:justify-center items-start xl:items-center gap-x-12 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="max-w-2xl lg:max-w-2xl">
              <Slide>
                <h1 className="mb-2 min-w-full lg:min-w-[700px] font-incognito font-semibold text-3xl sm:text-5xl leading-tight lg:leading-[3.7rem] tracking-tight">
                  {data.headline}
                </h1>
                <h2 className="mb-6 font-incognito text-headline-color text-xl tracking-tight">
                For Enhanced Business Processes
                </h2>
                <p className="text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                  {data.shortBio}
                </p>
              </Slide>
              <Slide delay={0.1}>
                <Social type="social" />
              </Slide>
            </div>
          ))}
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>
      <Job />
    </main>
  );
}
