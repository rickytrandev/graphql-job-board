import {
  getJob,
  getJobsByCompany,
  getJobs,
  createJob,
  deleteJob,
  updateJob,
} from "./db/jobs.js"
import { getCompany } from "./db/companies.js"
import { GraphQLError } from "graphql"

export const resolvers = {
  Query: {
    company: async (_, { id }) => {
      const company = await getCompany(id)

      if (!company) throw notFoundError(`No company found with id: ${id}`)
      return company
    },
    jobs: () => getJobs(),
    job: async (_, { id }) => {
      const job = await getJob(id)

      if (!job) throw notFoundError(`No job found with id: ${id}`)
      return job
    },
  },

  Mutation: {
    createJob: (_, { input: { title, description } }) => {
      const companyId = `FjcJCHJALA4i` // TODO set based on authenticated user
      return createJob({ title, description, companyId })
    },
    deleteJob: (_, { id }) => {
      const job = deleteJob(id)
      return job
    },
    updateJob: (_, { input: { id, title, description } }) => {
      return updateJob({ id, title, description })
    },
  },

  Job: {
    date: ({ createdAt }) => createdAt.slice(0, "yyyy-mm-dd".length),
    company: ({ companyId }) => getCompany(companyId),
  },

  Company: {
    jobs: ({ id }) => getJobsByCompany(id),
  },
}

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  })
}
