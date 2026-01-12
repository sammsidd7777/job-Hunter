import { useForm } from "react-hook-form";
import { useState } from "react";
import { useApplyJobMutation } from "../../RTK/CompanyService";

function ApplyJobForm({ jobId, setIsApply }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [applyJob] = useApplyJobMutation();

  const closeForm = () => {
    setTimeout(() => setIsApply(false), 2500);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      await applyJob({ jobId, data }).unwrap();

      setSuccess(true);
      setMessage("✅ Successfully applied for this job!");
      reset();
      closeForm();
    } catch (error) {
      setMessage(error?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      closeForm();
    }
  };

  /* ================= SUCCESS VIEW ================= */
  if (success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
        <p className="text-green-700 font-semibold text-lg">
          {message}
        </p>
        <p className="text-sm text-green-600 mt-1">
          This window will close automatically...
        </p>
      </div>
    );
  }

  /* ================= FORM VIEW ================= */
  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="
      w-full max-w-lg bg-white p-6 rounded-2xl
      border border-gray-200 shadow-lg
      flex flex-col
    "
  >
    {/* ERROR MESSAGE */}
    {message && (
      <p className="mb-4 text-sm text-red-600">
        {message}
      </p>
    )}

    {/* COVER LETTER */}
    <div className="mb-5 flex-1">
      <textarea
        {...register("coverLetter", {
          required: "Cover letter is required",
          minLength: {
            value: 30,
            message: "Minimum 30 characters required",
          },
        })}
        rows={6}
        placeholder="Why are you a good fit for this role?"
        className="
          w-full h-full resize-none rounded-lg
          border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {errors.coverLetter && (
        <p className="mt-1 text-xs text-red-600">
          {errors.coverLetter.message}
        </p>
      )}
    </div>

    {/* SUBMIT */}
    <button
      disabled={loading}
      className="
        w-full py-2.5 rounded-xl
        bg-blue-600 text-white text-sm font-semibold
        hover:bg-blue-700 transition
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {loading ? "Applying..." : "Submit Application"}
    </button>
  </form>

  );
}

export default ApplyJobForm;
