import type { NextPage } from "next";
import FormProject from "../components/newProject";
import { APIprojects } from "../lib/api";

const projects: NextPage = () => {
  return (
    <div>
      <FormProject> HI there </FormProject>
    </div>
  );
};

export default projects;
