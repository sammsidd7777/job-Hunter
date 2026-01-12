import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  Linkedin,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  useUpdateJobApplyStatusMutation,
  useViewCandidateDetailQuery,
} from "../RTK/HrService";

const ViewCandidateDetail = () => {
  const { candidateId,ApplicationId } = useParams();

  

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useViewCandidateDetailQuery(candidateId);

  const [updateJobApplyStatus] =
    useUpdateJobApplyStatusMutation();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load candidate
      </p>
    );

  const candidate = data?.candidate;

  console.log(candidate?.profilePic,"candidate?.profilePic")

  const handleStatusChange = async (status) => {
    try {
      await updateJobApplyStatus({
        id: ApplicationId, // ✅ correct id
        status,
      }).unwrap();

      refetch();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4">
        Candidates / {candidate?.role} /{" "}
        <span className="text-gray-700 font-medium">
          {candidate?.name}
        </span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ================= LEFT ================= */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <img
                src={
                  candidate?.profilePic
                    ? `http://localhost:5000/uploads${candidate?.profilePic}`
                    : "/default-avatar.png"
                }
                className="w-28 h-28 rounded-full mb-3 object-cover"
                alt="Candidate"
              />

              <h2 className="text-xl font-semibold">
                {candidate?.name}
              </h2>

              <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={14} />{" "}
                {candidate?.location || "INDIA"}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg"
                onClick={() =>
                  handleStatusChange("interview")
                }
              >
                <Calendar size={16} /> Called For Interview
              </button>

              <div className="flex gap-2">
                <button
                  className="flex-1 border rounded-lg py-2 text-sm"
                  onClick={() =>
                    handleStatusChange("shortlist")
                  }
                >
                  <CheckCircle
                    size={16}
                    className="inline mr-1"
                  />
                  Shortlist
                </button>

                <button
                  className="flex-1 border rounded-lg py-2 text-sm text-red-500"
                  onClick={() =>
                    handleStatusChange("reject")
                  }
                >
                  <XCircle
                    size={16}
                    className="inline mr-1"
                  />
                  Reject
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} /> {candidate?.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />{" "}
                {candidate?.phone || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                <Linkedin size={16} /> LinkedIn
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="lg:col-span-3 space-y-6">
          {/* Resume */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                Resume
              </h3>

              {candidate?.resume && (
                <div className="flex gap-2">
                  <a
                    href={`http://localhost:5000/${candidate.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border px-3 py-1.5 rounded-lg text-sm"
                  >
                    <Eye
                      size={14}
                      className="inline mr-1"
                    />
                    Preview
                  </a>

                  <a
                    href={`http://localhost:5000/${candidate.resume}`}
                    download
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                  >
                    <Download
                      size={14}
                      className="inline mr-1"
                    />
                    Download
                  </a>
                </div>
              )}
            </div>

            {candidate?.resume ? (
              <p className="text-sm text-gray-600">
                Uploaded resume available
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                No resume uploaded
              </p>
            )}
          </section>

          {/* About */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">
              About Candidate
            </h3>
            <p className="text-gray-600 text-sm">
              {candidate?.bio || "No bio provided"}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ViewCandidateDetail;
