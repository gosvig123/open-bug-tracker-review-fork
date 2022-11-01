import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIBugs } from "../../../lib/api";
import { useUser } from "../../../lib/auth";


interface Bug {
  id: string
  message: string
  solved_at: null
  first_seen: string
  last_seen: string
  occurrences: Object[]
}

interface Occurrence {
  _id: string
  project_id: number
  bug_id: string
  message: string
  stack_trace: string
  metadata: object
}



function Bug(): JSX.Element {

  const [bugdetails, setBugDetails] = useState<any>({})
  const [listoccurrences, setListOccurrences] = useState<any>([])
  const router = useRouter()
  const id = router.query.id
  useUser()

  useEffect(() => {
    getBug()
  }, [id])

  async function getBug() {
    if (typeof id !== 'string') {
      return
    }
    const result = await APIBugs.getBug(id)
    const bug = result?.data
    const occurrences = result?.data.occurrences
    setBugDetails(bug)
    setListOccurrences(occurrences)
  }

  return (
    <div>

      <h1> THIS IS BUG DETAILS</h1>
      <h1> {bugdetails?.bug_id} </h1>
      {/* <p> {bugdetails.message} </p> */}
      <div> {listoccurrences?.map((occurrence: Occurrence) => {
        return (
          <ul key={occurrence._id}>
            <Link href={`/bugs/${bugdetails.bug_id}/occurrences/${occurrence._id}`}> here should be the date</Link>
          </ul>
        )
      })}
      </div>
    </div>
  )
}

export default Bug