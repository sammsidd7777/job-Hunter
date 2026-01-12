import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGethrCompanyQuery,
  useUpdateCompanyMutation,
  useUpdateLogoMutation,
} from "../RTK/CompanyService";

const CompanyProfile = () => {
  const { data, isLoading } = useGethrCompanyQuery();
  const company = data?.company;

  const [updateCompany, { isLoading: saving }] =
    useUpdateCompanyMutation();
  const [updateLogo] = useUpdateLogoMutation();

  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState("");

  // Prefill form
  useEffect(() => {
    if (company) {
      reset({
        companyName: company.companyName,
        industry: company.industry,
        founded: company.founded || "",
        description: company.description,
      });
      setPreview(company.companyLogo);
    }
  }, [company, reset]);

  // UPDATE COMPANY DETAILS
  const onSubmit = async (updatedData) => {
    try {
      await updateCompany(updatedData).unwrap();
      alert("Company updated successfully");
    } catch (error) {
      alert(error?.data?.message || "Update failed");
    }
  };

  // LOGO UPLOAD
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

 
    const uploaded = await fakeUpload(file);

    await updateLogo({
      url: uploaded.url,
    }).unwrap();

    setPreview(uploaded.url);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LOGO */}
        <div className="bg-white border rounded-xl p-6 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border overflow-hidden mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Logo
              </div>
            )}
          </div>

          <label className="text-blue-600 cursor-pointer text-sm">
            Upload Logo
            <input
              type="file"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </label>
        </div>

        {/* DETAILS */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border rounded-xl p-6 lg:col-span-2"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              {...register("companyName", { required: true })}
              placeholder="Company Name"
              className="border px-3 py-2 rounded-lg"
            />

            <input
              {...register("industry")}
              placeholder="Industry"
              className="border px-3 py-2 rounded-lg"
            />

            <input
              type="number"
              {...register("founded")}
              placeholder="Founded Year"
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <textarea
            {...register("description")}
            rows={4}
            className="border mt-4 w-full px-3 py-2 rounded-lg"
            placeholder="About company"
          />

          <div className="flex justify-end mt-6">
            <button
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <h2 className="text-2xl font-bold">{company.totalJobs}</h2>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Open Jobs</p>
          <h2 className="text-2xl font-bold text-green-600">
            {company.openJobs}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
