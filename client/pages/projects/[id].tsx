import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIprojects } from "../../lib/api";

interface Project {
  id: number;
  name: string;
  bugs_count_active: number;
  bugs_count_total: number;
  bugs: any;
}

function Project(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    getProject();
  }, []);

  const [project, setProject] = useState<any>("");

  const id = router.query.id;

  const getProject = async function () {
    if (typeof id !== "string") {
      return;
    }
    const result = await APIprojects.getProject(id);
    const project = result?.data;

    setProject(project);
  };

  return <div>{project} </div>;
}

export default Project;
