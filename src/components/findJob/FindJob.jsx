import React, { useState, useEffect } from "react";
import { Search, MapPin, Bookmark, BookmarkCheck } from "lucide-react";

import { useGetFilteredJobsQuery } from "../../RTK/AuthService";
import {
  useSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import ApplyJobForm from "../Forms/ApplyJobForm";
import NotificationToasty from "../Notification-Toasty/NotificationToasty";

const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [employmentTypes, setEmploymentType] = useState("");
  const [skills, setSkills] = useState("");
  const [isApply, setIsApply] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [message, setMessage] = useState("");

  /* ================= RTK ================= */
  const [saveJob, { isLoading: saving }] = useSavedJobMutation();
  const { data: savedData } = useGetSavedJobsQuery();

  const { data: jobsData = [], isLoading } = useGetFilteredJobsQuery({
    search: searchTerm,
    location,
    employmentType: employmentTypes,
    skill: skills,
  });

  const savedJobIds = savedData?.savedJobs?.map((j) => j._id) || [];

  /* ================= SAVE JOB ================= */
  const handleSaveJob = async (id) => {
    try {
      setMessage("Saving job...");
      await saveJob(id).unwrap();
      setMessage("Job saved successfully");
    } catch (error) {
      setMessage(error?.data?.message || "Already saved");
    }
  };

  /* ================= AUTO HIDE TOAST ================= */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {message && <NotificationToasty message={message} />}

      {/* ================= SEARCH ================= */}
      <section className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2">
            Find your dream job
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Browse thousands of opportunities.
          </p>

          <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-gray-900 p-3 rounded-xl shadow border dark:border-gray-800">
            <div className="flex items-center flex-1">
              <Search className="text-gray-400 mx-2" size={18} />
              <input
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none p-2 text-sm"
              />
            </div>

            <div className="flex items-center flex-1">
              <MapPin className="text-gray-400 mx-2" size={18} />
              <input
                placeholder="City or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none p-2 text-sm"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ================= FILTER ================= */}
        <aside className="bg-white dark:bg-gray-900 p-5 rounded-xl border dark:border-gray-800 shadow-sm space-y-6">
          <h3 className="font-semibold">Job Type</h3>

          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                name="employment"
                value={type}
                onChange={(e) => setEmploymentType(e.target.value)}
              />
              {type}
            </label>
          ))}

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <input
              className="w-full border dark:border-gray-700 bg-transparent rounded-lg p-2 text-sm"
              placeholder="React, Node, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </aside>

        {/* ================= JOB LIST ================= */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            {jobsData.length} Jobs Found
          </h2>

          {isLoading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : jobsData.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {jobsData.map((job) => (
                <div
                  key={job._id}
                  className="relative bg-white dark:bg-gray-900 border dark:border-gray-800 
                             rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  {/* SAVE BUTTON */}
                  <button
                    onClick={() => handleSaveJob(job._id)}
                    disabled={saving}
                    className="absolute top-4 right-4 p-2 rounded-full 
                               bg-white dark:bg-gray-800 hover:bg-gray-100 
                               dark:hover:bg-gray-700 shadow transition"
                  >
                    {savedJobIds.includes(job._id) ? (
                      <BookmarkCheck className="text-green-600" size={20} />
                    ) : (
                      <Bookmark className="text-gray-500 hover:text-blue-600" size={20} />
                    )}
                  </button>

                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {job.company?.name}
                  </p>

                  <div className="flex gap-2 mt-4 text-xs">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {job.employmentType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                      {job.location}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="font-semibold">
                      ₹{job.salaryRange?.min} – ₹{job.salaryRange?.max}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedJobId(job._id);
                        setIsApply(true);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Apply →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= APPLY MODAL ================= */}
      {isApply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setIsApply(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>
            <ApplyJobForm jobId={selectedJobId} setIsApply={setIsApply} />
          </div>
        </div>
      )}
    </main>
  );
};

export default FindJob;
