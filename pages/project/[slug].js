import Layout from "@/components/Layout";
import Markdown from "@/components/ReactMarkdown";
import { getDirectoryPages } from "@/libs/getDirectoryPages";

import ProjectCard from "@/blocks/ProjectCard";
import Image from "next/image";

const ProjectPage = ({ nextProject, currentProject: { frontMatter, content } }) => {
  // Current Project frontMatter
  const { title, image, description, category, projectInfo } = frontMatter;

  return (
    <Layout metaTitle={title} metaDescription={description} ogImage={image}>
      <section className="pt-24 pb-28">
        <div className="container">
          <div className="row justify-center banner">
            <div className="md:col-7 lg:col-6" data-aos="fade-up-sm">
              <span className="inline-block text-sm rounded-full bg-[#efefef] px-3 py-1 capitalize text-black mb-6">{category}</span>

              <h1 className="text-4xl md:text-5xl mb-4 !leading-tight">{title}</h1>
              <p>{description}</p>

              <ul className="row text-white mt-4">
                {projectInfo.map((item, index) => (
                  <li key={index} className="col-6 mt-8">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                      {item.title}
                    </p>
                    <div className="[&_a]:underline [&_a]:hover:no-underline [&_li]:mt-1">
                      <Markdown content={item.data} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="md:col-5 lg:col-4 mt-12 md:mt-0"
              data-aos="fade-up-sm"
              data-aos-delay="100"
            >
              <Image
                className="aspect-square object-cover object-center rounded-lg bg-light/20 w-full md:w-[500px]"
                src={image}
                alt={title}
                width={`500`}
                height={`500`}
              />
            </div>

            <div className="lg:col-10">
              <hr className="opacity-5 mt-28 mb-24" />
            </div>
          </div>

          <div className="row justify-center" data-aos="fade-in">
            <div className="lg:col-10">
              <article className="content content-light [&_img]:w-full">
                <Markdown content={content} />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white text-dark rounded-b-2xl overflow-hidden">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px] text-center">
              Next Project
            </h2>
          </div>
          <div className="row justify-center">
            <div className="lg:col-6">
              {nextProject && (
                <ProjectCard
                  index={0}
                  slug={nextProject.slug}
                  frontMatter={nextProject.frontMatter}
                  twoColumns={true}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProjectPage;

export const getStaticPaths = async () => {
  const allProjects = getDirectoryPages("content/project");
  const paths = allProjects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const allProjects = getDirectoryPages("content/project");

  const currentIndex = allProjects.findIndex((item) => item.slug == slug);
  const currentProject = allProjects[currentIndex];
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  return {
    props: {
      currentProject: currentProject,
      nextProject: nextProject,
    },
  };
};
