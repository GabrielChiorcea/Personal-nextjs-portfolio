import BlogCard from "@/blocks/BlogCard";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getDirectoryPages } from "@/libs/getDirectoryPages";
import { getSinglePage } from "@/libs/getSinglePage";
import { useState } from "react";

const Blog = ({ blogPage, blogPosts }) => {

  const totalPosts = blogPosts.length;
  let { title, subtitle } = blogPage.frontMatter;
  subtitle = subtitle + ` (${totalPosts})`;

  const postsToShow = 6;
  const [posts, setPosts] = useState(blogPosts.slice(0, postsToShow));
  const [loadMore, setLoadMore] = useState(true);

  const handleLoadMore = () => {
    let currentLength = posts.length;
    let postLoaded = postsToShow + currentLength;
    let isMore = currentLength < totalPosts;
    const nextResults = isMore
      ? blogPosts.slice(currentLength, currentLength + postsToShow)
      : [];
    setPosts([...posts, ...nextResults]);
    totalPosts < postLoaded && setLoadMore(false);
  };

  return (
    <Layout metaTitle={title}>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="py-28 bg-white text-dark rounded-b-2xl">
        <div className="container">
          <div className="row md:gx-4 gy-5">
            {posts.map((item, index) => (
              <div
                key={item.slug}
                className="lg:col-4 sm:col-6 init-delay"
                data-aos="fade-up-sm"
                data-aos-duration="500"
                style={{
                  "--lg-delay": `${(index % 3) * 75}ms`,
                  "--md-delay": `${(index % 2) * 75}ms`,
                  "--sm-delay": `${(index % 2) * 75}ms`
                }}
              >
                <BlogCard slug={item.slug} frontMatter={item.frontMatter} />
              </div>
            ))}

            <div className="text-center mt-16">
              {(blogPosts.length > postsToShow) && loadMore ? (
                <button className="button button-dark" onClick={() => handleLoadMore()}>
                  <span>Load More</span>
                </button>
              ) : (
                <p className="text-black/25">No more posts to load</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Blog;

// Export Props
export const getStaticProps = () => {
  const blogPage = getSinglePage("content/blog/_index.md");
  const blogPosts = getDirectoryPages("content/blog");

  return {
    props: {
      blogPage: blogPage,
      blogPosts: blogPosts,
    },
  };
};
