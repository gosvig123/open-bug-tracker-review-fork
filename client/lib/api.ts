import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: "John Doe" });
}

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const APIprojects = {
  async postProjects(project: string) {
    try {
      return await api.post("/projects", {
        name: project,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getProjects() {
    try {
      return await api.get("/projects");
    } catch (error) {
      console.log(error);
    }
  },
};

export { handler, api, APIprojects };
