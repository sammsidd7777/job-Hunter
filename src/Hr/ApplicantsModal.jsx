import React, { useState } from "react";
import {
  useGetApplicationsForJobQuery,
  useUpdateJobApplyStatusMutation,
} from "../RTK/HrService";
import { Link } from "react-router-dom";

const statusStyle = {
  applied: "bg-blue-100 text-blue-700",
  shortlisted: "bg-green-100 text-green-700",
  interview: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-purple-100 text-purple-700",
};

const ApplicantsModal = ({ jobId, onClose }) => {
  const { data, isLoading, isError, refetch } =
    useGetApplicationsForJobQuery(jobId);

  const applicants = data?.application || [];

  console.log(applicants, "application")
 
  const [loadingId, setLoadingId] = useState(null);

 

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-5xl rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Applicant Management
            </h2>
            <p className="text-sm text-gray-500">
              Track and manage candidate applications
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <p className="p-6 text-center">Loading applicants…</p>
          ) : isError ? (
            <p className="p-6 text-center text-red-500">
              Failed to load applicants
            </p>
          ) : applicants.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No applicants yet
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Candidate</th>
                  <th className="px-6 py-3 text-left">Applied Role</th>
                  <th className="px-6 py-3 text-left">Experience</th>
                  <th className="px-6 py-3 text-left">Date Applied</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-center">Resume</th>
                  <th className="px-6 py-3 text-right">View Profile</th>
                </tr>
              </thead>

              <tbody>
                {applicants.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Candidate */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${app?.applicant?.name}`}
                        alt=""
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {app?.applicant?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app?.applicant?.email}
                        </p>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-gray-700">
                      {app?.job?.title || "—"}
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4">
                      {app?.experience || "—"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[app.status]
                          }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Resume */}
                    <td className="px-6 py-4 text-center">
                      {app?.resumeUrl && (
                        <a
                          href={`http://localhost:5000/${app.resumeUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          📄
                        </a>
                      )}
                    </td>

                  
                    <td>
                     <Link to={`/candidates/${app.applicant._id}/${app._id}`}>
  View Candidate
</Link>



                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsModal;
