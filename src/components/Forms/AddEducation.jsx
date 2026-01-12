import React from "react";
import { useForm } from "react-hook-form";
import { useAddEducationMutation } from "../../RTK/AuthService";

const AddEducation = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const [addEducation, { isLoading }] = useAddEducationMutation();

const onSubmit = async (data) => {
  try {
    await addEducation(data).unwrap();

    // close modal only after success
    if (onClose) onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to add education");
  }
};


  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Education</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Degree */}
        <div>
          <label className="text-xs text-gray-500">Degree *</label>
          <input
            {...register("degree", { required: true })}
            className="w-full rounded-xl border px-4 py-2.5"
            placeholder="B.Tech / B.Sc / MBA"
          />
          {errors.degree && (
            <p className="text-xs text-red-500">Degree is required</p>
          )}
        </div>

        {/* Institute */}
        <div>
          <label className="text-xs text-gray-500">Institute *</label>
          <input
            {...register("institute", { required: true })}
            className="w-full rounded-xl border px-4 py-2.5"
            placeholder="University / College"
          />
          {errors.institute && (
            <p className="text-xs text-red-500">Institute is required</p>
          )}
        </div>

      

        {/* Years */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Start Year</label>
            <input
              type="number"
              {...register("completeYear")}
              className="w-full rounded-xl border px-4 py-2.5"
            />
          </div> 

          
        </div>

     

       

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEducation;
