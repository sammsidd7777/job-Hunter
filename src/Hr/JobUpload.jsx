import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateJobMutation } from "../RTK/HrService";
import NotificationToasty from "../components/Notification-Toasty/NotificationToasty";

const JobUpload = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        company: "Nike",
        employmentType: data.employmentType,
        salaryRange: {
          min: Number(data.salaryMin),
          max: Number(data.salaryMax),
        },
        skills,
        recruiter: "673340f4b26afba75dc14c8e",
        isActive: true,
      };

      await createJob(payload).unwrap();
      setToastMessage("Job created successfully!");
      setToastType("success");

      reset();
      setSkills([]);
    } catch {
      setToastMessage("Failed to create job!");
      setToastType("error");
    }
  };

  return (
<>
      {/* Toast */}
      <NotificationToasty message={toastMessage} type={toastType} />

      {/* FULL WIDTH CARD */}
  <div className="w-full max-w-full overflow-x-hidden rounded-xl border border-gray-100 bg-white/90 ">


        {/* Header */}
        <div className="border-b px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Job
          </h1>
        
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-10 py-8 space-y-5"
        >

          {/* Title + Type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Job Title
              </label>
              <input
                {...register("title", { required: true })}
                placeholder="Frontend React Developer"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Employment Type
              </label>
              <select
                {...register("employmentType")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              {...register("description", { required: true })}
              placeholder="Describe responsibilities, skills & expectations..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Location
              </label>
              <input
                {...register("location")}
                placeholder="Remote / Delhi"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Min Salary
              </label>
              <input
                type="number"
                {...register("salaryMin")}
                placeholder="₹"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Max Salary
              </label>
              <input
                type="number"
                {...register("salaryMax")}
                placeholder="₹"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Required Skills
            </label>

            <div className="flex gap-3 mt-2 max-w-xl">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. React"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            {skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-600"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-6 border-t flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {isLoading ? "Creating..." : "Create Job"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default JobUpload;
