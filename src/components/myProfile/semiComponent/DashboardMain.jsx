import { Link } from "react-router-dom";
import { useGetProfileQuery, useGetUserDashboardQuery } from "../../../RTK/AuthService";

const DashboardMain = () => {

  const { data: userData } = useGetUserDashboardQuery();
  console.log(userData)

const similarJobs = userData?.data?.similarJobs || [];
  const thingsToUpdate = userData?.data.thingsToUpdate ||[];


  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 px-10 py-8 text-gray-900 dark:text-gray-100">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{userData?.data?.userName}! 👋</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here are your recommendations today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to={"/edit-profile"}>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              Edit Profile
            </button>
          </Link>

          <Link to={"/resume"}>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
              Update Resume
            </button>
          </Link>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {[
          { label: "Interviews", value: userData?.data?.totalInterview, growth: "+12%" },
          { label: "Profile Views", value: userData?.data?.totalProfileView, growth: "+48%" },
          { label: "Saved Jobs", value: userData?.data?.totalSavedJob || 0, growth: "+5%" },

          { label: "Applications", value: userData?.data?.totalApplication, growth: "+20%" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400 dark:text-gray-400">{item.label}</span>
              <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-700/30 px-2 py-1 rounded-full">
                {item.growth}
              </span>
            </div>
            <h2 className="text-3xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="grid grid-cols-3 gap-8">

        {/* ================= JOB LIST ================= */}
        <div className="col-span-2 space-y-5">
          {similarJobs.map((i, index) => (
            <div
              key={i._id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{i?.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {i.employmentType}
                </p>
                <div className="flex gap-3 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    ${i.salaryRange?.max}-- ${i.salaryRange?.min}</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-700/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                    New
                  </span>
                </div>
              </div>

              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="space-y-6">

          {/* PROFILE COMPLETION */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-md">
  <div className="flex justify-between mb-3">
    <h3 className="font-semibold">Complete Profile</h3>
    <span className="text-sm">{userData?.data?.profileScore || 0}%</span>
  </div>

  <div className="bg-blue-400 h-2 rounded-full mb-4 dark:bg-blue-500/60">
    <div
      className="bg-white h-2 rounded-full transition-all duration-500"
      style={{ width: `${userData?.data?.profileScore || 0}%` }}
    ></div>
  </div>

  <div className="flex flex-col gap-3 mt-4">
    {thingsToUpdate?.map((item) => (
      <p key={item} className="text-xs text-white">
        {item}
      </p>
    ))}
  </div>
</div>


          {/* RECENT ACTIVITY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50">
            <h3 className="font-semibold mb-4">Recent Activity</h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">🔵 Application Viewed</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Uber viewed your application
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">2h ago</span>
              </div>

              <div>
                <p className="font-medium">🟢 New Job Match</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Spotify matches your preferences
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">5h ago</span>
              </div>

              <div>
                <p className="font-medium">🟠 Interview Reminder</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Airbnb interview tomorrow at 10 AM
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">1d ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DashboardMain;
