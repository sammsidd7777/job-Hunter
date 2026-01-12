import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../RTK/AuthService";

const HrCheck = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetProfileQuery();

  useEffect(() => {
    if (isLoading) return;

    // If API error or user is not HR → redirect
    if (isError || userData?.user?.role?.toLowerCase() !== "hr") {
      navigate("/", { replace: true });
    }
  }, [userData, isLoading, isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-600 text-lg animate-pulse">
          Checking HR access...
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default HrCheck;
