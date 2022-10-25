import React, { useState } from "react";
import { APIprojects } from "../../lib/api";

interface FormProject {
  children: React.ReactNode[] | React.ReactNode;
}

export default function FormProject({ children }: FormProject): JSX.Element {
  const [project, setProject] = useState("");

  const handleInput = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setProject(event.target.value);
  };

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await APIprojects.postProjects(project);
    console.log(project);
    setProject("");
  };

  return (
    <div>
      {children}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput}></input>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
