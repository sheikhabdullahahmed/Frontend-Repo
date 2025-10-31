import { useContext, useState } from "react";
import AuthLayout from "../Components/Layout/AuthLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import Input from "../Components/Input/Input.jsx";
import { validEmail } from "../utilis/helper.js";
import axiosInstance from "../utilis/axiosinstance.js";
import { UserContext } from "../Context/UserContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null);
    // ✅ Login API call yahan karein

    try {
      const response = await axiosInstance.post("http://localhost:4000/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        // ✅ correct condition
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/expensetracker/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
  setError(error.response.data.message);
}else {
        setError("Something went wrong, please  try again  ");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center h-full lg:w-[70%] ">
        <h3 className="text-2xl font-semibold text-black mb-2">Welcome Back</h3>
        <p className="text-sm text-gray-700 mb-6">
          Please log in to continue managing your expenses.
        </p>

        <form onSubmit={handlelogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            type="email"
            placeholder="Email Address"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="Min 8 characters"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}




export default  Login