import React from "react";

interface FormProject {
  children: React.ReactNode[] | React.ReactNode;
}

export default function FormProject({ children }: FormProject): JSX.Element {
  return (
    <div>
      {children}
      <form>
        <input type="text"></input>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
