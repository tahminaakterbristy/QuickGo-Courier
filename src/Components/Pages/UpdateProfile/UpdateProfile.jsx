import { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [previewImage, setPreviewImage] = useState(user?.photoURL || "");

  const auth = getAuth(); 

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prevData) => ({
        ...prevData,
        photoURL: imageUrl,
      }));
    }
  };

  // Handle profile update
  const handleUpdate = () => {
    updateProfile(auth.currentUser, { 
      displayName: formData.name,
      photoURL: formData.photoURL,
    })
      .then(() => {
        setUser({ ...auth.currentUser }); 
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          confirmButtonText: "Awesome!",
          background: "#fff",
          iconColor: "#4CAF50",
          confirmButtonColor: "#4CAF50",
        });

        
        setFormData({
          name: "",
          photoURL: "",
        });
        setPreviewImage(""); 
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
          confirmButtonText: "Try Again",
          background: "#fff",
          iconColor: "#FF5733",
          confirmButtonColor: "#FF5733",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-16 p-8 bg-gradient-to-r from-green-200 to-green-100 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Update Profile</h2>

      {previewImage && (
        <div className="flex justify-center mb-6">
          <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-green-500" />
        </div>
      )}

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400 transition duration-200"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Profile Picture URL</label>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400 transition duration-200"
          placeholder="Enter profile picture URL"
        />
        <div className="flex items-center mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full py-3 mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition duration-300"
      >
        Update Profile
      </button>
    </div>
  );
};

export default UpdateProfile;
