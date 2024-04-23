import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Usage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="max-w-2xl">
      <div className="mt-12 mb-8">
        <h2 className="mb-4 font-bold text-4xl tracking-tight">Usage</h2>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      {profile.map((textBlock, id) => (
        <PortableText
          key={id}
          value={textBlock.usage}
          components={CustomPortableTextFavicon}
        />
      ))}
    </section>
  );
}
