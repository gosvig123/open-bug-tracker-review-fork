import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: "John Doe" });
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

interface Project {
  id: number;
  name: string;
  bugs_count_active: number;
  bugs_count_total: number;
}

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
      return await api.get<Project[]>("/projects");
    } catch (error) {
      console.log(error);
    }
  },
};

interface BugAPI {
  id: string;
  message: string;
  solved_at: null,
  first_seen: string, 
  last_seen: string, 
  num_occurrences: number,
  occurrences:  [ 
 {
  report_date: string, 
  stack_trace:string, 
  meta_data: {
    user_agent: string,
    browser:string
  }
 }

  ]
}

const APIBugs = {
  async bugDetails(): Promise<BugAPI> {
    return new Promise((resolve) => {
      resolve({
        id: "123",
        message: "Unkown variable bananas",
        solved_at: null,
        first_seen: "2022-10-22T16:40:29+0000", 
        last_seen: "2022-10-22T16:40:29+0000",
        num_occurrences: 3,
        occurrences: [
          {
            report_date: "2022-10-22T16:40:29+0000",
            stack_trace: "i do not know what stack trace is", 
            meta_data: {
              user_agent: '1234',
              browser: 'Safari'
            }
          }
          // ,  {
          //   report_date: "2022-10-22T16:40:29+0000",
          //   stack_trace: "i do not know what stack trace is", 
          //   meta_data: {
          //     user_agent: '1234',
          //     browser: 'Chrome'
          //   }
          // },  {
          //   report_date: "2022-10-22T16:40:29+0000",
          //   stack_trace: "i do not know what stack trace is", 
          //   meta_data: {
          //     user_agent: '1234',
          //     browser: 'Chrome'
          //   }
          // }
        ]
      })
    })
  }
  // async bugDetails() {
  //   try {
  //     return await api.get('projects/:id/bugs/:id')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

// const APIOccurrences() {
//   async ocurrenceDetails() {
//     try {
//       return await api.get('')
//     }
//   }
// } 

export { handler, api, APIprojects, APIBugs };
