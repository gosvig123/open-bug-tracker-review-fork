import { AxiosResponse } from "axios";
import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";
import FormProject from "../components/newProject";
import { APIprojects } from "../lib/api";

interface Project {
  id: number;
  name: string;
  bugs_count_active: number;
  bugs_count_total: number;
}

function Projects(): JSX.Element {
  const [listProjects, setListProjects] = useState<Project[] | any>([]);

  const getProjects = async function () {
    const result = await APIprojects.getProjects();

    setListProjects(result);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <FormProject> HI there </FormProject>

      <li>
        {/* {listProjects.map((project: { id: Key | null | undefined }) => {
          return (
            <div key={project.id}>
              <a>project.name</a>
              <a>project.bugs_count_active</a>
              <a>project.bugs_count_total</a>
            </div>
          );
        })} */}
      </li>
    </div>
  );
}

export default Projects;
