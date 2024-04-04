import { GetServerSideProps } from 'next';
import Posts from '../pages/Posts';
import { PostType } from '@/types';
import { sanityFetch } from '@/lib/sanity.client';

export const getServerSideProps: GetServerSideProps = async () => {
  const posts: PostType[] = await sanityFetch({
    query: `*[_type == "post"][0...2]`,
    tags: ["Post"],
  });

  return {
    props: {
      posts,
    },
  };
};

interface HomePageProps {
  posts: PostType[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <Posts posts={posts} />
    </div>
  );
}