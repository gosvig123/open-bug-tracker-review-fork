import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIBugs } from "../../lib/api";

interface Bug {
  id: string
  message: string
  solved_at: null
  first_seen: string
  last_seen: string
  occurrences: [
    {
      report_date: string,
      stack_trace: string,
      meta_data:
      {
        user_agent: string,
        browser: string
      }

    }
  ]
}
function Bug(): JSX.Element {

  const router = useRouter()
  useEffect(() => {
    getBug()
  }, [])


  const [bugdetails, setBugDetails] = useState<any>({})

  const id = router.query.id

  const getBug = async function () {
    if (typeof id !== 'string') {
      return
    }
    const result = await APIBugs.getBug(id)
    const bug = result?.data
    setBugDetails(bug)


  }
  return (
    <div>

      <h1> THIS IS BUG DETAILS</h1>
      <h1> {bugdetails.bug_id} </h1>
      <p> {bugdetails.message} </p>
    </div>
  )
}

export default Bug