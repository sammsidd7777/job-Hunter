import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreateCompany from "./CreateCompany";
import { useGetAllcompanyQuery } from "../../RTK/CompanyService";
import { useRegisterUserMutation } from "../../RTK/AuthService";

const Register = ({changeTologin}) => {
 const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors }
} = useForm({
  defaultValues: {
     role: "user",
      company: ""
  }
});


  const { data: companyData, refetch } = useGetAllcompanyQuery();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const role = watch("role");
const selectedCompany = watch("company");


  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      changeTologin();

    } catch (err) {
      alert(err.data?.message || "Registration failed");
    }
  };

  const handleCompanyCreated = async (newCompany) => {
    await refetch(); // update list
    setShowCreateCompany(false);

    reset((prev) => ({
      ...prev,
      company: newCompany._id, // auto-select created company
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        {showCreateCompany && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl w-[400px] shadow-lg">
              <CreateCompany 
                onSuccess={handleCompanyCreated}
                onClose={() => setShowCreateCompany(false)}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select {...register("role")} className="w-full border rounded-md p-2">
              <option value="user">User</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {/* Company Dropdown */}
          {role === "hr" && (
            <div>
              <label className="text-sm font-medium">Select Company</label>
              <select
                {...register("company", { required: true })}
                className="w-full border rounded-md p-2"
                onChange={(e) => {
                  if (e.target.value === "new") {
                    setShowCreateCompany(true);
                  }
                }}
              >
                <option value="">-- Select Company --</option>
                
                {companyData?.companies.map((c) => (
                  <option key={c._id} value={c._id} >
                    {c.companyName}
                    {c._id}
                  </option>
                ))}

                <option value="new">➕ Create New Company</option>
              </select>
            </div>
          )}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
