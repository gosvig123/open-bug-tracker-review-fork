import React, { useState } from "react";

interface FormProject {
  children: React.ReactNode[] | React.ReactNode;
  onSubmit: (project: string) => Promise<void>;
}

export default function FormProject({
  onSubmit,
  children,
}: FormProject): JSX.Element {
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
    await onSubmit(project);
    setProject("");
  };

  return (
    <div>
      {children}
      <form onSubmit={handleSubmit}>
        <input value={project} type="text" onChange={handleInput}></input>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
