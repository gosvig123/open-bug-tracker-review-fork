import { Card } from "@contentful/f36-components"
import { useEffect, useState } from "react"
import { APIBugs } from "../lib/api"


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



function BugDetails(): JSX.Element {
  const [bugDeatails, setbugDetails] = useState<Bug | any>({})

  const getBugDetails = async function () {
    const result = await APIBugs.bugDetails()
    console.log(result)
    setbugDetails(result)
    console.log(result)

  }

  useEffect(() => {
    getBugDetails()
  }, [])

  return (
    <div key={bugDeatails.id}>

      {/* big part */}
      <Card> solved (not solved){bugDeatails.solved_at}</Card>
      <Card> bug message is {bugDeatails.message}</Card>
      <div>
        {bugDeatails.occurrences.map((event: { stack_trace: string }) => {
          return (
            <div key={bugDeatails.id}>
              <p> {event.stack_trace}</p>
            </div>
          )
        })}
      </div>

      {/* info panel */}
      <p> first seen:  {bugDeatails.first_seen} </p>
      <p> last seen: {bugDeatails.last_seen} </p>
      <p> num_occurrences: {bugDeatails.num_occurrences} </p>

      {/* chart  */}
      {bugDeatails.occurrences.map((event: { report_date: string, meta_data: { user_agent: string, browser: string } }) => {
        return (
          <div key={bugDeatails.id}>
            <p> date is {event.report_date} </p>
            <p> user agent is {event.meta_data.user_agent}</p>
          </div>
        )
      })}
    </div>
  )
}

export default BugDetails