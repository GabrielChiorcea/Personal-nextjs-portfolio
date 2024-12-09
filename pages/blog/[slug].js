import Layout from "@/components/Layout";
import Markdown from "@/components/ReactMarkdown";
import SharePost from "@/components/SharePost";
import siteConfig from "@/config/site.config.json";
import { getDirectoryPages } from "@/libs/getDirectoryPages";
import { formatDate } from "@/libs/utils/formatDate";

import Image from "next/image";
import Link from "next/link";

const BlogPage = ({ previousPost, nextPost, currentPost: { slug, frontMatter, content } }) => {
  // Current post frontMatter
  const { title, date, image, description, category } = frontMatter;

  // Get Page Url
  const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;

  return (
    <Layout metaTitle={title} metaDescription={description} ogImage={image}>
      <section className="pt-24 pb-28">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-8 text-center banner mb-16" data-aos="fade-up-sm">
              <div className="flex flex-wrap items-center justify-center mb-12 space-x-8">
                <span className="inline-block text-sm rounded-full bg-[#efefef] px-3 py-1 capitalize text-black">
                  {category}
                </span>
                <span className="opacity-75 text-sm">{formatDate(date)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl mb-4 !leading-tight">{title}</h1>
              <p className="max-w-xl mx-auto">{description}</p>
            </div>

            {image && (
              <div className="lg:col-10 mx-auto" data-aos="fade-up-sm" data-aos-delay="100">
                <div className="h-[460px] bg-black/20 overflow-hidden relative z-10 rounded-lg">
                  <Image
                    className="w-auto h-[460px] object-cover object-center mx-auto z-10 rounded-lg"
                    src={image}
                    alt={title}
                    width={`1020`}
                    height={`460`}
                  />
                  <Image
                    className="w-full h-[500px] object-cover filter blur-sm absolute top-0 left-0 -z-10 scale-110 opacity-50"
                    src={image}
                    alt={title}
                    width={`100`}
                    height={`100`}
                  />
                </div>
              </div>
            )}

            <div className="xl:col-9 lg:col-10 mx-auto" data-aos="fade-in">
              <div className={`sm:flex flex-wrap sm:flex-nowrap w-full ${image !== null ? "pt-20" : ""}`}>
                <div className="sm:order-2 sm:pl-12 xl:pl-24">
                  <article className="content content-light">
                    <Markdown content={content} />
                  </article>
                </div>

                <div className="sm:order-1 w-full sm:w-auto">
                  <div className="sticky top-8">
                    <SharePost title={title} pageUrl={pageUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white text-dark rounded-b-2xl overflow-hidden">
        <div className="container">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px] text-center">
              Keep Reading
            </h2>
          </div>
          <div className="row gy-2 sm:gy-4 justify-center">
            {previousPost && (
              <div className="xl:col-6 lg:col-8 md:col-10">
                <div className="relative group flex items-center z-10">
                  <div className="shrink-0 relative overflow-hidden rounded sm:rounded-lg h-[4.5rem] w-[4.5rem] sm:h-28 sm:w-28 self-start pointer-events-none">
                    <Image
                      src={previousPost.frontMatter.image}
                      alt={previousPost.frontMatter.title}
                      width={300}
                      height={300}
                      className="duration-500 group-hover:scale-110 group-hover:-rotate-1 object-cover w-full h-full rounded sm:rounded-lg group-hover:brightness-75 bg-light/20"
                    />
                  </div>
                  <div className="grow pl-4 sm:pl-7 transition-all duration-500 group-hover:opacity-60">
                    <span className="absolute right-0 sm:-right-1/4 top-0 leading-[0.65] text-[25vh] -z-10 opacity-[0.015] select-none">PREV</span>
                    <div className="flex flex-wrap items-center mb-4 space-x-5">
                      <span className="inline-block text-sm rounded-full bg-[#efefef] px-3 py-1 capitalize">
                        {previousPost.frontMatter.category}
                      </span>
                      <span className="opacity-75 text-sm">
                        {formatDate(previousPost.frontMatter.date)}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl leading-snug">
                      <Link
                        href={`/blog/${previousPost.slug}`}
                        className="stretched-link"
                      >
                        {previousPost.frontMatter.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <div className="lg:col-12"></div>
            {nextPost && (
              <div className="xl:col-6 lg:col-8 md:col-10">
                <div className="relative group flex items-center z-10">
                  <div className="grow pr-4 sm:pr-7 transition-all duration-500 group-hover:opacity-60">
                    <span className="absolute left-0 sm:-left-1/4 top-0 leading-[0.65] text-[25vh] -z-10 opacity-[0.015] select-none">NEXT</span>
                    <div className="flex flex-wrap items-center justify-end mb-4 space-x-5">
                      <span className="opacity-75 text-sm">
                        {formatDate(nextPost.frontMatter.date)}
                      </span>
                      <span className="inline-block text-sm rounded-full bg-[#efefef] px-3 py-1 capitalize">
                        {nextPost.frontMatter.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl leading-snug text-right">
                      <Link
                        href={`/blog/${nextPost.slug}`}
                        className="stretched-link"
                      >
                        {nextPost.frontMatter.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="shrink-0 relative overflow-hidden rounded sm:rounded-lg h-[4.5rem] w-[4.5rem] sm:h-28 sm:w-28 self-start pointer-events-none">
                    <Image
                      src={nextPost.frontMatter.image}
                      alt={nextPost.frontMatter.title}
                      width={300}
                      height={300}
                      className="duration-500 group-hover:scale-110 group-hover:-rotate-1 object-cover w-full h-full rounded sm:rounded-lg group-hover:brightness-75 bg-light/20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BlogPage;

export const getStaticPaths = async () => {
  const allPosts = getDirectoryPages("content/blog");
  const paths = allPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const allPosts = getDirectoryPages("content/blog");

  const currentIndex = allPosts.findIndex((post) => post.slug == slug);
  const currentPost = allPosts[currentIndex];
  const previousPost = allPosts[currentIndex - 1] || allPosts[allPosts.length - 1];
  const nextPost = allPosts[currentIndex + 1] || allPosts[0];

  return {
    props: {
      currentPost: currentPost,
      previousPost: previousPost,
      nextPost: nextPost,
    },
  };
};
