import React, { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUploadResumeMutation,
} from "../../../RTK/AuthService";
import { useForm } from "react-hook-form";

const ResumePage = () => {
  const { data: user } = useGetProfileQuery();
  const [uploadResume, { isLoading: uploading }] = useUploadResumeMutation();
  const [showResumeModal, setShowResumeModal] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [prev, setPrev] = useState("");

  // Initialize preview from user data
const defaultResume = user?.user?.resume;

console.log(defaultResume,"defaultresume")

  useEffect(() => {
    if (defaultResume) {
      setPrev(`http://localhost:5000/${defaultResume}`);
    }
  }, [user]);

  const onUploadResume = async (data) => {
    if (!data.resume || data.resume.length === 0) return;
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    try {
      const res = await uploadResume(formData).unwrap();
      if (res?.resumePath) {
        setPrev(`${res.resumePath}`);
      }
      reset();
      setShowResumeModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="bg-[#F6F7FB] dark:bg-gray-950 min-h-screen p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Your Resume</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Current Resume */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  CURRENT RESUME
                </h3>
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200 px-3 py-1 rounded-full">
                  ● Active
                </span>
              </div>

              {prev ? (
                <div className="flex items-center justify-between bg-[#F9FAFB] dark:bg-gray-700 border dark:border-gray-600 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200 p-3 rounded-xl font-bold">
                      PDF
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {prev.split("/").pop()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Uploaded resume
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={prev}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      ⬇
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No resume uploaded</p>
              )}
            </div>

            {/* Upload Resume */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">Update Resume</h3>

              <div
                onClick={() => setShowResumeModal(true)}
                className="border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-2xl p-10 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl">
                  ☁
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PDF, DOCX, RTF • Max 5MB</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-100">Preview</h4>
                👁
              </div>
              <div className="rounded-xl overflow-hidden border dark:border-gray-700">
                {prev ? (
                  <object
                    data={prev}
                    type="application/pdf"
                    className="w-full h-[400px] bg-white dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400 p-4">
                      PDF preview not supported.{" "}
                      <a href={prev} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline ml-1">
                        Click here
                      </a>
                    </p>
                  </object>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                    No resume available
                  </div>
                )}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Recruiters spend ~6 seconds scanning resumes. Keep it concise and highlight achievements with metrics.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[420px] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Update Resume</h3>
              <button onClick={() => setShowResumeModal(false)} className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition">✕</button>
            </div>

            <form onSubmit={handleSubmit(onUploadResume)} className="space-y-5">
              <label className="border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                <span className="text-2xl text-blue-600 dark:text-blue-300">☁</span>
                <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">Click to upload or drag & drop</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">PDF, DOCX, RTF (Max 5MB)</p>
                <input type="file" accept=".pdf,.doc,.docx,.rtf" {...register("resume", { required: true })} className="hidden" />
              </label>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowResumeModal(false)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 transition">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60 hover:bg-blue-700 transition">
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumePage;
