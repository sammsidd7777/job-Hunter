import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../RTK/AuthService";
import { useForm } from "react-hook-form";
import EditProfileImg from "../../Forms/EditProfileImg";
import ArrayInputField from "../../Forms/ArrayInputField";
import AddEducation from "../../Forms/AddEducation";

const Profile = () => {
  const { data } = useGetProfileQuery();
  const [updateUser] = useUpdateProfileMutation();
  const [editProfileImg, setEditProfileImg] = useState(false);

  const [skill, setSkill] = useState("");
  const [skillArr, setSkillArr] = useState([]);
  const [skillToadd, setSkillToadd] = useState("");

  const [showAddEducation, setShowAddEducation] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  const user = data?.user;
  const profileScore = data?.profileScore;
  const thingsToUpdate = data?.thingsToUpdate;

  useEffect(() => {
    if (user) {
      reset(user);
      setSkillArr(user.skills || []);
      setValue("skills", user.skills || []);
    }
  }, [user, reset, setValue]);

  const onSubmit = async (data) => {
    await updateUser(data).unwrap();
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6">

          {/* PROFILE IMAGE */}
          <div className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="p-[3px] rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500">
                  <img
                    src={`http://localhost:5000/uploads${user?.profilePic}`}
                    className="w-28 h-28 rounded-full object-cover"
                    alt="profile"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setEditProfileImg(true)}
                  className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
                >
                  ✎
                </button>

                {editProfileImg && <EditProfileImg onClose={setEditProfileImg} />}
              </div>
            </div>
          </div>

          {/* PROFILE STRENGTH */}
          <div className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Strength</span>
              <span className="text-sm font-semibold text-blue-600">{profileScore}%</span>
            </div>

            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>

            {thingsToUpdate?.map((i, index) => (
              <p key={index} className="text-xs text-gray-500 mt-3">{i}</p>
            ))}

            {profileScore === 100 && (
              <p className="text-xs text-green-600 mt-3">🎉 Profile completed 100%</p>
            )}
          </div>

          {/* RESUME */}
          <div className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Resume</h4>
            {user?.resume ? (
              <a
                href={`http://localhost:5000/${user.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                📄 View Resume
              </a>
            ) : (
              <button className="text-sm text-blue-600 hover:underline">
                + Upload Resume
              </button>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* PERSONAL INFO */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl"
          >
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <button type="submit" className="text-sm text-blue-600">Save Changes</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                <input {...register("name")} className="mt-1 w-full rounded-xl border px-4 py-2.5" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Phone</label>
                <input {...register("phone")} className="mt-1 w-full rounded-xl border px-4 py-2.5" />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs text-gray-500">Bio</label>
              <textarea {...register("bio")} rows="4" className="mt-1 w-full rounded-xl border px-4 py-2.5" />
            </div>

            {/* SKILLS INPUT */}
            <div className="mt-5">
              <label className="text-xs text-gray-500">Skills</label>
              <div className="flex gap-2 mt-1">
                <input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full rounded-xl border px-4 py-2.5"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!skill.trim()) return;
                    setSkillToadd(skill.trim());
                    setSkill("");
                  }}
                  className="px-5 rounded-xl bg-blue-600 text-white"
                >
                  Add
                </button>
              </div>

              <ArrayInputField
                addItem={skillToadd}
                onChange={(arr) => {
                  setSkillArr(arr);
                  setValue("skills", arr);
                }}
              />
            </div>
          </form>

          {/* EDUCATION */}
          <div className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Education</h3>
              {showAddEducation && <AddEducation onClose={() => setShowAddEducation(false)} />}
              <button onClick={() => setShowAddEducation(true)} className="text-sm text-blue-600">
                + Add
              </button>
            </div>
          </div>

          {/* SKILLS DISPLAY */}
          <div className="bg-white/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(user?.skills || []).map((s, i) => (
                <span key={i} className="px-4 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
