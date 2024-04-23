import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "@/app/components/shared/PageHeading";
import ProjectsPage from '../projects/page'; // Путь может отличаться в зависимости от структуры вашего проекта
import Posts from '../components/pages/Posts';
import StaticTextSection from '../components/pages/StaticTextSection';

export const metadata: Metadata = {
  title: "About | Sergei Vasilevich",
  metadataBase: new URL("https://sergeivas.com/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Sergei Vasilevich",
    url: "https://sergeivas.com/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/sergeivas/image/upload/v1692635746/sergeivas/og.png",
  },
};

export default async function About() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <>
    {/* <main className="relative mx-auto px-6 md:px-16 max-w-3xl lg:max-w-7xl"> */}
    <main className="relative mx-auto px-6 md:px-16 max-w-3xl lg:max-w-7xl">
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="relative justify-items-center gap-x-6 grid grid-cols-1 lg:grid-cols-custom">
              <div className="order-2 lg:order-none">
                <Slide>
                  <h1 className="mb-8 font-incognito font-semibold text-3xl sm:text-5xl lg:leading-tight tracking-tight basis-1/2">
                    I&apos;m {data.fullName}. I live in {data.location}, where I
                    build the future.
                  </h1>

                  <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <PortableText
                      value={data.fullBio}
                      components={CustomPortableText}
                    />
                  </div>
                </Slide>
              </div>

              

              <aside className="flex flex-col justify-self-auto lg:justify-self-center gap-y-8 order-none lg:order-1 mb-12">
                <Slide delay={0.1}>
                  <div className="top-10 sticky">
                    <Image
                      className="bg-top mb-4 rounded-2xl min-h-96 max-h-96 object-cover"
                      src={data.profileImage.image}
                      width={400}
                      height={400}
                      quality={100}
                      alt={data.profileImage.alt}
                      placeholder="blur"
                      blurDataURL={data.profileImage.lqip}
                      priority
                    />

                    <div className="flex flex-col gap-y-4 text-center">
                      <div className="flex items-center gap-x-3">
                        <a
                          href="https://www.linkedin.com/in/sergeydigital/"
                          rel="noreferrer noopener"
                          target="_blank"
                          className="flex justify-center items-center gap-x-2 dark:hover:border-zinc-700 hover:border-zinc-200 bg-zinc-100 dark:bg-primary-bg py-2 border border-transparent rounded-md font-incognito font-semibold text-center text-lg basis-[90%]"
                        >
                          View Résumé <BiLinkExternal className="text-base" />
                        </a>
                        <a
                          href={`${data.resumeURL}?dl=${data.fullName}-resume`}
                          className="flex justify-center items-center dark:hover:border-zinc-700 hover:border-zinc-200 bg-zinc-100 dark:bg-primary-bg py-3 border border-transparent rounded-md text-center text-lg text-secondary-color dark:text-primary-color hover:underline basis-[10%]"
                          title="Download Resume"
                        >
                          <BiSolidDownload
                            className="text-lg"
                            aria-label="Download Resume"
                          />
                        </a>
                      </div>

                      <a
                        href={`mailto:${data.email}`}
                        className="flex items-center gap-x-2 hover:text-primary-color"
                      >
                        <BiEnvelope className="text-lg" />
                        {data.email}
                      </a>
                    </div>
                  </div>
                </Slide>
              </aside>
            </section>
            <Slide delay={0.14}>
              <Usage />
              <Heroes />
            </Slide>
              
            {/* <Posts max={1} fax={2} /> */}
            {/* <Slide delay={0.14}>
              <Usage />
            </Slide>
            <Heroes /> */}
          </div>
        ))}
    </main>
    {/* <Slide delay={0.34}>
      <StaticTextSection />
    </Slide> */}
      
    </>
  );
}
