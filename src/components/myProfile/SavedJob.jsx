import { Trash2 } from "lucide-react";
import { useDeleteSavedJobMutation, useGetSavedJobsQuery } from "../../RTK/savedJobsApi";

const SavedJobs = () => {
  const { data, isLoading, isError } = useGetSavedJobsQuery();
  const [deleteSavedJob] = useDeleteSavedJobMutation();

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-900 dark:text-gray-100">
        Loading saved jobs...
      </p>
    );
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load jobs</p>;
  }

  return (
    <div className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Saved Jobs</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You have {data?.count || 0} saved opportunities waiting for you.
          </p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {data?.savedJobs?.map((job) => (
          <div
            key={job._id}
            className={`group relative flex flex-col sm:flex-row justify-between gap-4 p-6 rounded-2xl 
            border bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl
            shadow-sm hover:shadow-xl transition-all duration-300
            ${
              job.status === "closed"
                ? "opacity-60 border-gray-300 dark:border-gray-700"
                : "border-gray-200 dark:border-gray-800"
            }`}
          >
            {/* Left */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 
                text-white flex items-center justify-center font-bold text-lg shadow-md">
                {job.company?.[0]}
              </div>

              <div>
                <h2 className={`text-lg font-semibold ${job.status === "closed" && "line-through"}`}>
                  {job.title}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {job.company} • {job.location}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.jobType && (
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300">
                      {job.jobType}
                    </span>
                  )}
                  {job.salary && (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300">
                      {job.salary}
                    </span>
                  )}
                </div>

                {job.deadline && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    ⏰ Deadline: {job.deadline}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Saved on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              {job.status === "active" ? (
                <button className="px-5 py-2 text-sm rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                  text-white shadow-md hover:scale-105 hover:shadow-lg transition">
                  Apply Now
                </button>
              ) : (
                <button
                  disabled
                  className="px-5 py-2 text-sm rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                >
                  Closed
                </button>
              )}

              <button
                onClick={() => deleteSavedJob(job._id)}
                className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
