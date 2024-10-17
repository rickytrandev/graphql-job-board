import { GraphQLClient, gql } from "graphql-request"

const client = new GraphQLClient("http://localhost:9000/graphql")

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        company {
          name
          id
        }
      }
    }
  `
  const { jobs } = await client.request(query)
  return jobs
}

export const getJob = async (id) => {
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {
        id
        date
        title
        description
        company {
          id
          name
        }
      }
    }
  `
  const { job } = await client.request(query, { id })
  return job
}

export const getCompany = async (id) => {
  const query = gql`
    query ($id: ID!) {
      company(id: $id) {
        id
        description
        name
        jobs {
          id
          title
          description
          date
        }
      }
    }
  `
  const { company } = await client.request(query, { id })
  return company
}

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation ($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
      }
    }
  `
  const { job } = await client.request(mutation, {
    input: { title, description },
  })
  
  return job
}
