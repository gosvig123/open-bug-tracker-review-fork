

import { Card } from "@contentful/f36-components"
import Link from "next/link"
import { useEffect, useState } from "react"
import { APIBugs } from "../lib/api"




interface Bug {

  bug_id: string
  message: string
  solved_at: null
  first_seen: string
  last_seen: string
}

function BugDetails(): JSX.Element {

  const [listBugs, setListBugs] = useState<any>([])

  const getBugs = async function () {
    const result = await APIBugs.getBugs();
    if (result !== undefined) {
      setListBugs(result.data);
    }
  };

  useEffect(() => {
    getBugs();
  }, []);

  return (
    <div>
      {listBugs.map((bug: Bug) => {
        return (
          <ul key={bug.bug_id}>
            <Link href={`bugs/${bug.bug_id}`}>{bug.message}</Link>
            <p>{bug.first_seen} </p>
            <p>{bug.last_seen} </p>
          </ul>
        );
      })}
    </div >
  )
 }

export default BugDetails;