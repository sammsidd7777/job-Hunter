// src/components/CreateCompany.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCompanyMutation } from "../../RTK/CompanyService";

const CreateCompany = ({onClose}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const onSubmit = async (companyData) => {
    setMessage("");

    try {
      const res = await createCompany(companyData).unwrap();

      setMessage("🎉 Company created successfully!");
      onClose();

    } catch (err) {
      setMessage(err?.data?.message || "Error creating company");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create New Company
      </h2>

      {message && (
        <p className="p-3 mb-4 text-center rounded-md bg-blue-100 text-blue-700">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            {...register("companyName", { required: "Company name is required" })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Google / Amazon"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="3"
            {...register("description")}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Write a short company description..."
          ></textarea>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <input
            {...register("companyLogo")}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://logo.com/img.png"
          />
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
