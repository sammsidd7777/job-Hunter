import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HrService = createApi({
  reducerPath: "HrService",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/", // ✅ keep api root clean
    credentials: "include",
  }),

  tagTypes: ["Jobs", "Applications", "Candidate"],

  endpoints: (builder) => ({

    // 🟢 CREATE JOB
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "/jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 🟠 UPDATE JOB
    updateJob: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 🔴 DELETE JOB
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 🔵 GET HR JOBS
    getAllJobs: builder.query({
      query: () => "/jobs/hr",
      providesTags: ["Jobs"],
    }),

    // 🔵 GET ALL JOBS (PUBLIC)
    getAllforJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),

    // 🧾 GET APPLICATIONS FOR JOB
    getApplicationsForJob: builder.query({
      query: (id) => `/applications/job/${id}`,
      providesTags: ["Applications"],
    }),

    // 🔁 UPDATE JOB ACTIVE STATUS
    updateJobActiveStatus: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 🔁 UPDATE APPLICATION STATUS
    updateJobApplyStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),

    // 👤 VIEW CANDIDATE DETAIL (HR)
    viewCandidateDetail: builder.query({
      query: (id) => `/users/candidate/${id}`,
    }),

  }),
});

// ✅ EXPORT HOOKS
export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useGetApplicationsForJobQuery,
  useUpdateJobActiveStatusMutation,
  useGetAllforJobsQuery,
  useUpdateJobApplyStatusMutation,
  useViewCandidateDetailQuery,
} = HrService;
