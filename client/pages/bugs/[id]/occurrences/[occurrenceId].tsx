import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIOccurrences } from "../../../../lib/api";

function Occurrence() {
  const [occurrenceDetails, setOccurrenceDetails] = useState<any>({})
  const router = useRouter()
  const { id: bugId, occurrenceId } = router.query


  useEffect(() => {
    getOccurrence()
  }, [bugId, occurrenceId])



  const getOccurrence = async function () {
    if (typeof bugId !== 'string' || typeof occurrenceId !== 'string') {

      return
    }
    const result = await APIOccurrences.ocurrenceDetails(bugId, occurrenceId)
    console.log(result)
    setOccurrenceDetails(result?.data)

  }

  return (
    <div>
      <p>{occurrenceDetails.bugId} </p>
      <p>{occurrenceDetails.message} </p>
      <p>{occurrenceDetails.project_id} </p>
      <p>{occurrenceDetails.stack_trace} </p>


    </div>
  )
}







export default Occurrence