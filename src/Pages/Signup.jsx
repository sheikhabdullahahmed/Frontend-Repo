import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../Components/Layout/AuthLayout.jsx";
import Input from "../Components/Input/Input.jsx";
import { validEmail } from "../utilis/helper.js";
import axiosInstance from "../utilis/axiosinstance.js"
import { UserContext } from "../Context/UserContext.jsx";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.imageUrl || "";
  } catch (err) {
    console.error("Image upload failed:", err);
    return "";
  }
};

function Signup() {
  const [profilepic, setProfilepic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    // Validation
    if (!fullName) return toast.error("Full name is required");
    if (!validEmail(email))
      return toast.error("Please enter a valid email address.");
    if (!password || password.length < 8)
      return toast.error("Password must be at least 8 characters long.");

    try {
      if (profilepic) {
        profileImageUrl = await uploadImage(profilepic);
      }

      const response = await axiosInstance.post(
        "http://localhost:4000/signup",
        {
          email,
          password,
          fullName,
          profileImageUrl,
        }
      );

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // redirect after 2s
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full flex flex-col justify-center h-auto md:h-full mt-10 md:mt-0">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today and take control of your finances with ease!
        </p>

        <form onSubmit={handleSignup}>
          {/* <ProfilePhotoSelector image={profilepic} setImage={setProfilepic} />
           */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
              {profilepic ? (
                <img
                  src={URL.createObjectURL(profilepic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  Upload
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilepic(e.target.files[0])}
              className="text-sm text-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full name"
              type="text"
              placeholder="Ahmed"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              type="email"
              placeholder="Email Address"
            />
            <div className="col-span-1 md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                type="password"
                placeholder="Min 8 characters"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-3">
            Sign up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>

        {/* Toast container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthLayout>
  );
}

export default Signup;
