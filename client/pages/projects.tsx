import Link from "next/link";
import { Key, ReactNode, useEffect, useState } from "react";
import FormProject from "../components/newProject";
import { APIprojects } from "../lib/api";

interface Project {
  id: number;
  name: string;
  bugs_count_active: number;
  bugs_count_total: number;
}

function Projects(): JSX.Element {
  const [listProjects, setListProjects] = useState<any>([]);

  const getProjects = async function () {
    const result = await APIprojects.getProjects();
    const projects = result?.data;
    setListProjects(projects);
  };

  const createProject = async function (project: string) {
    await APIprojects.postProjects(project);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <FormProject onSubmit={createProject}> Hi there </FormProject>


      {listProjects.map(
        (project: { [x: string]: ReactNode; id: Key | null | undefined }) => {

          return (
            <ul key={project.id}>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
              <a> {project.bugs_count_active}</a>
              <a> {project.bugs_count_total}</a>
            </ul>
          );
        }
      )}
    </div>
  );
}

export default Projects;
