import React, { useState } from "react";
import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useUpdateJobActiveStatusMutation,
} from "../RTK/HrService";
import ApplicantsModal from "./ApplicantsModal";

const HRDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: allJobs, isLoading, refetch } = useGetAllJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const [updateJobActiveStatus] = useUpdateJobActiveStatusMutation();

  if (isLoading) return <p className="p-6">Loading dashboard...</p>;

  const jobs = allJobs?.data?.jobs || [];

  const totalJobs = allJobs?.data?.jobsLenght || 0;
  const activeJobs = jobs.filter((job) => job?.isActive).length;
  const totalApplicants = allJobs?.data?.applicationNumber || 0;
  const interviewsScheduled = 0;

  const handleHeringOff = async (id) => {
    await updateJobActiveStatus(id).unwrap();
    refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this job?")) {
      await deleteJob({ id }).unwrap();
      refetch();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your recruitment today.
          </p>
        </div>

      
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Active Jobs", value: totalJobs, color: "blue" },
          { label: "New Applicants", value: totalApplicants, color: "purple" },
          { label: "Interviews Scheduled", value: interviewsScheduled, color: "orange" },
          { label: "Hires this Month", value: activeJobs, color: "green" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border"
          >
            <p className="text-sm text-gray-500 mb-2">{item.label}</p>
            <h3 className={`text-3xl font-bold text-${item.color}-600`}>
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* RECENT JOB POSTINGS */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Job Postings
            </h2>
            <p className="text-sm text-gray-500">
              Manage your active listings and applicants
            </p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="p-6 text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Job Title</th>
                  <th className="px-6 py-3 text-left">Applicants</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 text-l capitalize py-4 font-medium text-gray-800">
                      {job.title}
                    
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedJob(job._id)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      {job.isActive ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                          Closed
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right space-x-3">
                     

                      <button
                        onClick={() => handleHeringOff(job._id)}
                        className="text-green-600 hover:underline"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedJob && (
        <ApplicantsModal
          jobId={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default HRDashboard;
