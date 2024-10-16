import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { getCompany } from "../lib/graphql/queries"
import JobList from "../components/JobList"

function CompanyPage() {
  const { companyId } = useParams()
  // const [company, setCompany] = useState(null)
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  })

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId)
        
        setState({
          company,
          loading: false,
          error: false,
        })
      } catch (error) {
        console.log('error response', error.response.errors)
        setState({
          company: null,
          loading: false,
          error: true
        })
      }
    })()
  }, [companyId])

  const {company, loading, error} = state

  if (company) {
    return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="subtitle is-5">Jobs</h2>

      <JobList jobs={company.jobs} />
    </div>
  )}
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  if (error) {
    return (
      <div>Data Unavailable</div>
    )
  }
}

export default CompanyPage
