import Layout from "@/components/Layout";
import { getDirectoryPages } from "@/libs/getDirectoryPages";
import { getSinglePage } from "@/libs/getSinglePage";
import Link from "next/link";

import Banner from "@/blocks/Banner";
import BlogCard from "@/blocks/BlogCard";
import ProjectCard from "@/blocks/ProjectCard";
import WorkProcess from "@/blocks/WorkProcess";
import Image from "next/image";

const Home = ({ homepage, projectPage, projects, blogPage, blogPosts, serverPage, server }) => {
  const { banner, featuredBy, workProcess } = homepage.frontMatter;

  return (
    <Layout className="overflow-hidden">
      <Banner banner={banner} />

      {featuredBy.enable && (
        <section className="pt-28 lg:pb-10 overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-10">
                <h2
                  className="text-3xl font-secondary font-medium text-center"
                  data-aos="fade"
                >
                  {featuredBy.title}
                </h2>
              </div>
              <div className="col-12">
                <div className="flex justify-center items-center flex-wrap">
                  {featuredBy.brands_white.map((item, index) => (
                    <div
                      key={index}
                      className="mx-4 sm:mx-8 my-4"
                      data-aos="fade-left"
                      data-aos-delay={index * 50}
                    >
                      <Image
                        src={item}
                        alt="Brand"
                        width={120}
                        height={80}
                        className="w-auto h-auto sm:max-h-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

<section className="py-0">
  <div className="container">
    <div className="row mb-16 items-end">
      <div className="sm:col-8 order-2 sm:order-1">
        <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px] text-center sm:text-left">
          {projectPage.frontMatter.title}
        </h2>
      </div>
      <div className="sm:col-4 order-1 sm:order-2 block mb-4 sm:mb-0 text-center sm:text-right">
        <span className="font-secondary text-2xl leading-none text-white/75">
          {projectPage.frontMatter.subtitle}
        </span>
      </div>
    </div>

    <div className="row md:gx-6 gy-6">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          style={{
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          className={`${
            i % 6 >= 3 ? 'sm:col-12 lg:col-4' : 'lg:col-4 sm:col-12'
          } ${i === 7 ? 'hidden lg:block' : ''}`}
        >
          <h3 className="py-1">
            <span className="bg-violet-600 text-black-800 text-1xl font-melodrama me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              {project.frontMatter.lang
                ? project.frontMatter.lang.split('').map((char, index) => (
                    <span
                      key={index}
                      data-aos="flip-up"
                      data-aos-delay={index * 100}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))
                : null}
            </span>
          </h3>

          <ProjectCard
            index={i}
            slug={project.slug}
            frontMatter={project.frontMatter}
            twoColumns={i % 6 >= 3}
          />
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-28">
        <div className="container">
          <div className="row mb-16 items-center justify-center">
            <div className="w-full sm:w-auto text-center">
              <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px]">
                {serverPage.frontMatter.title}
              </h2>
            </div>
        </div>


        <div className="flex justify-center items-center ">
  {server.map((project, i) => (
    <div
      key={project.slug}
      className="w-full md:w-1/2 lg:w-3/3" // Controlul dimensiunii
    >
      <ProjectCard
        index={i}
        slug={project.slug}
        frontMatter={project.frontMatter}
      />
    </div>
  ))}
</div>


          <div className="text-center mt-16">
            <Link className="button" href="/project">
              <span>All Works</span>
            </Link>
          </div>
        </div>
      </section>


      <WorkProcess workProcess={workProcess} />

      <section className="py-28 bg-white text-dark rounded-b-2xl">
        <div className="container">
          <div className="row mb-16 items-end">
            <div className="sm:col-8 order-2 sm:order-1">
              <h2 className="text-black text-4xl md:text-5xl font-secondary font-medium -mt-[6px] text-center sm:text-left">
                {blogPage.frontMatter.title}
              </h2>
            </div>
            <div className="sm:col-4 order-1 sm:order-2 block mb-4 sm:mb-0 text-center sm:text-right">
              <span className="font-secondary text-2xl leading-none text-black/75">
                {blogPage.frontMatter.subtitle}
              </span>
            </div>
          </div>

          <div className="row md:gx-4 gy-5">
            {blogPosts.map((item, index) => (
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
          </div>

          <div className="text-center mt-16">
            <Link className="button button-dark" href="/blog">
              <span>All Posts</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Home;

// Export Props
export const getStaticProps = () => {
  const homepage = getSinglePage("content/_index.md");
  const projectPage = getSinglePage("content/project/_index.md");
  const projects = getDirectoryPages("content/project", 6);
  const serverPage = getSinglePage("content/serverproject/_index.md");
  const server = getDirectoryPages("content/serverproject", 1);
  const blogPage = getSinglePage("content/blog/_index.md");
  const blogPosts = getDirectoryPages("content/blog", 3);

  return {
    props: {
      homepage: homepage,
      projectPage: projectPage,
      projects: projects,
      serverPage:serverPage,
      server:server,
      blogPage: blogPage,
      blogPosts: blogPosts,
    },
  };
};
