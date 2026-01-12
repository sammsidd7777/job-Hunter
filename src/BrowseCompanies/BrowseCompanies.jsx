import React, { useState } from "react";
import { useGetAllcompanyQuery } from "../RTK/CompanyService";

const BrowseCompanies = () => {
  const [search, setSearch] = useState("");

  const { data: companiesData, isLoading } = useGetAllcompanyQuery();

  const filteredCompanies = companiesData?.companies?.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-900 dark:text-gray-100">Loading companies...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Browse Companies
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company..."
          className="
            border border-gray-300 dark:border-gray-700
            rounded-xl p-3 w-80 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            transition-colors duration-300
          "
        />
      </div>

      {/* Company List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies?.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-gray-900
                rounded-2xl shadow-md dark:shadow-none
                p-6 hover:shadow-xl dark:hover:shadow-lg
                transition-all duration-300 border border-gray-200 dark:border-gray-700
              "
            >
              {/* Logo + Name */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={company.logo || "/meta.png"}
                  alt={company.companyName}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100">
                    {company.companyName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 capitalize">
                    {company?.category || "Industry not provided"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 capitalize">
                {company?.description || "No description available."}
              </p>

              {/* Stats Row */}
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <p className="flex items-center gap-2">
                  🧑‍💼 <span className="font-medium">Employees:</span>{" "}
                  {company.employees || "N/A"}
                </p>

                <p className="flex items-center gap-2">
                  🗓️ <span className="font-medium">Founded:</span>{" "}
                  {company.founded || "N/A"}
                </p>

                <p className="flex items-center gap-2">
                  💼 <span className="font-medium">Open Jobs:</span>{" "}
                  <span className="text-blue-600 font-semibold">
                    {company.totalJobs || 0}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No companies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseCompanies;
