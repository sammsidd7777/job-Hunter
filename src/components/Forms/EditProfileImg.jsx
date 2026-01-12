import React from "react";
import { useForm } from "react-hook-form";
import { useUploadImageMutation } from "../../RTK/GlobalUploadService";
import {  useUploadProfileImgMutation } from "../../RTK/AuthService";

const EditProfileImg = ({onClose}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploadImage, { isLoading: uploading }] =
    useUploadImageMutation();

  const [updateProfile, { isLoading: updating }] =
    useUploadProfileImgMutation();

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const uploadResponse = await uploadImage(formData).unwrap();

      // ⚠️ adjust this according to your backend response
      const imageUrl =
        uploadResponse.url ||
        uploadResponse.image ||
        uploadResponse.data?.url;

      if (!imageUrl) {
        throw new Error("Image URL not returned from server");
      }

      // 2️⃣ Send URL to backend
      await updateProfile({ url: imageUrl }).unwrap();

      console.log("Profile image updated successfully");

      onClose(false)
    } catch (err) {
      console.error("Profile image update failed", err);
    }
  };

 return (
  <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-6 w-80 shadow-xl space-y-4 animate-scaleIn"
    >
      <h3 className="text-center font-semibold text-gray-800">
        Update Profile Picture
      </h3>

      <input
        type="file"
        accept="image/*"
        {...register("image", {
          required: "Profile image is required",
        })}
        className="w-full text-sm"
      />

      {errors.image && (
        <p className="text-red-500 text-xs">{errors.image.message}</p>
      )}

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="w-full py-2 border rounded-xl text-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={uploading || updating}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          {uploading || updating ? "Updating..." : "Upload"}
        </button>
      </div>
    </form>
  </div>
);

};

export default EditProfileImg;
