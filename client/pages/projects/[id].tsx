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

  const id = router.query.id;
  const [project, setProject] = useState<any>("");

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    const getProject = async function (id: string) {
      const result = await APIprojects.getProject(id);
      const project = result?.data;
      console.log(result);
      setProject(project);
    };

    getProject(id);
  }, [id]);

  return <div></div>;
}

export default Project;
