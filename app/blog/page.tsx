import { Metadata } from "next";
import { BiDetail } from "react-icons/bi";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Blog | Sergei Vas",
  metadataBase: new URL("https://sergeivas.com/blog"),
  description: "Read latest stories from Sergei Vas's Blog",
  openGraph: {
    title: "Blog | Sergei Vas",
    url: "https://sergeivas.com/blog",
    description: "Read latest stories from Sergei Vas's Blog",
    images:
      "https://res.cloudinary.com/sergeivas/image/upload/v1692636087/sergeivas/blog.png",
  },
};

export default async function Blog() {
  return (
    <main className="mx-auto px-6 md:px-16 max-w-7xl">
      <PageHeading
        title="Blog Posts"
        description="Welcome to my blog domain where I share personal stories about things I've learned, projects I'm hacking on and just general findings. I also write for other publications."
      >
        <Social type="publication" />
      </PageHeading>

      <Slide delay={0.1}>
        <div className="flex items-center gap-x-3 mb-8">
          <BiDetail />
          <h2 className="font-semibold text-xl tracking-tight">Explore All</h2>
        </div>
        <Posts />
      </Slide>
    </main>
  );
}
