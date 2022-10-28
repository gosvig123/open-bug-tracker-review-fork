import {
  Badge,
  Box,
  Card,
  EntityList,
  Subheading,
} from "@contentful/f36-components";
import Link from "next/link";
import { Key, ReactNode, useEffect, useState } from "react";
import FormProject from "../components/newProject";
import { APIprojects } from "../lib/api";
import styles from "../styles/Home.module.css";

interface Project {
  id: number;
  name: string;
  bugs_count_active: number;
  bugs_count_total: number;
}

function Projects(): JSX.Element {
  const [listProjects, setListProjects] = useState<any>([]);

  const getProjects = async function () {
    const projects = await APIprojects.getProjects();
    setListProjects(projects);
  };

  const createProject = async function (project: string) {
    await APIprojects.postProjects(project);
    getProjects();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <FormProject onSubmit={createProject}> </FormProject>
      <EntityList>
        {listProjects.map((project: Project) => {
          return (
            // <EntityList.Item
            //   key={project.id}
            //   title={project.name}
            //   description={project.bugs_count_active.toString()}
            //   contentType="Bug"
            //   withDragHandle
            // />
            <Card
              key={project.id}
              badge={<Badge variant="positive">solved</Badge>}
            >
              <Box padding="spacingS">
                <Subheading>{project.name}</Subheading>
              </Box>
            </Card>
            //  <Link href={`/projects/${project.id}`}>{project.name}</Link>
            // <p>
            //   {project.bugs_count_active}bugs, {project.bugs_count_total}
            //   bugs
            // </p>
          );
        })}
      </EntityList>
    </div>
  );
}

export default Projects;
