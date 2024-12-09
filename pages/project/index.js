import ProjectCard from "@/blocks/ProjectCard";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getDirectoryPages } from "@/libs/getDirectoryPages";
import { getSinglePage } from "@/libs/getSinglePage";
import { useState } from "react";

const Project = ({ projectPage, allProjects }) => {

  const totalProjects = allProjects.length;
  const { title, subtitle } = projectPage.frontMatter;

  const projectsToShow = 6;
  const [projects, setProjects] = useState(allProjects.slice(0, projectsToShow));
  const [loadMore, setLoadMore] = useState(true);

  const handleLoadMore = () => {
    const currentLength = projects.length;
    const postLoaded = projectsToShow + currentLength;
    const isMore = currentLength < totalProjects;
    const nextResults = isMore
      ? allProjects.slice(currentLength, currentLength + projectsToShow)
      : [];
    setProjects([...projects, ...nextResults]);
    totalProjects < postLoaded && setLoadMore(false);
  };

  return (
    <Layout metaTitle={title}>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="py-28 bg-white text-dark rounded-b-2xl">
        <div className="container">
          <div className="row md:gx-4 gy-4">
            {projects.map((project) => (
              <div key={project.slug} className="lg:col-4 sm:col-6">
                <ProjectCard slug={project.slug} frontMatter={project.frontMatter} />
              </div>
            ))}

            <div className="text-center mt-16">
              {allProjects.length > projectsToShow && loadMore ? (
                <button className="button button-dark" onClick={() => handleLoadMore()}>
                  <span>Load More</span>
                </button>
              ) : (
                <p className="text-black/25">No more projects to load</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Project;

// Export Props
export const getStaticProps = () => {
  const projectPage = getSinglePage("content/project/_index.md");
  const allProjects = getDirectoryPages("content/project");

  return {
    props: {
      projectPage: projectPage,
      allProjects: allProjects,
    },
  };
};
