import React from "react";
import { useState } from "react";
import AuthLayout from "../../Components/Layout/AuthLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../Components/Input/Input.jsx";
import { validEmail } from "../../utilis/helper.js";
import ProfilePhotoSelector from "../../Components/ProfilePhotoSelector.jsx";

function Signup() {
  const [profilepic, setProfilepic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = ""


    if(!fullname) {
      setError("Full name is required");
      return
    }


    if(!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;

    }

     if (!password) {
       setError("Password must be at least 8 characters long.");
       return
    }

setError(null);

// Signup api call

  };

  return (
    <AuthLayout>
      <div className=" lg:w-full   flex flex-col justify-center h-auto md:h-full  mt-10  md:mt-0  ">
        <h3 className="text-xl  font-semibold text-black">
          Create an Acccount{" "}
        </h3>
        <p className="text-xs text-slate-700  mt-[5px] mb-6 ">
          Join us today and take control of your finances with ease!
        </p>

        <form onSubmit={handleSignup}>


          <ProfilePhotoSelector image = {profilepic} setImage =  {setProfilepic} /> 


       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input
    value={fullname}
    onChange={({ target }) => setFullname(target.value)}
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

          
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign up 
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login 
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
