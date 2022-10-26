import { count } from "console";
import prisma from "../lib/prisma";

class Project {
  constructor(public id: number, public name: string) {}

  static async create(projectName: string): Promise<Project> {
    const { id, name } = await prisma.project.create({
      data: {
        name: projectName,
      },
    });
    return new Project(id, name);
  }

  static async getProjects(): Promise<any> {
    const projects = await prisma.project.findMany();

    const getActiveBugsOnProject = (project: Project): Promise<number> => {
      return prisma.bugs.count({
        where: { project_id: project.id, solved_at: null },
      });
    };
    const getTotalBugsOnProject = (project: Project): Promise<number> => {
      return prisma.bugs.count({
        where: { project_id: project.id },
      });
    };
    const projectInfoPromises = projects.map(async (project) => {
      return {
        ...project,
        bugs_count_active: await getActiveBugsOnProject(project),
        bugs_count_total: await getTotalBugsOnProject(project),
      };
    });
    const masterPromise = Promise.all(projectInfoPromises);
    return await masterPromise;
  }

  // static async getProject(id: number): Promise<any> {
}

export default Project;
