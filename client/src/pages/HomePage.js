import JobList from "../components/JobList"
import { getJobs } from "../lib/graphql/queries"
import { useState, useEffect } from "react"

function HomePage({ jobs }) {
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  )
}

export default HomePage
