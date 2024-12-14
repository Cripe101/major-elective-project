import { useNavigate } from "react-router";
import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";

const Signin = () => {
  const snap = useSnapshot(usersData);
  const [userName, setUserName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  // const userName = sessionStorage.getItem("userName");

  useEffect(() => {
    const savedUserName = localStorage.getItem("rememberedUserName");

    if (savedUserName) {
      usersData.userName = savedUserName;
      setRememberMe(true);
    }
  }, []);

  const proceedSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberedUserName", snap.userName);
    } else {
      // Clear saved credentials if "Remember Me" is unchecked
      localStorage.removeItem("rememberedUserName");
    }

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) {
          alert("Failed to fetch user data.");
          return;
        }

        const users = await response.json();

        // Find the user based on `userName`
        const user = users.find(
          (u: { userName: string }) => u.userName === snap.userName
        );

        if (!user) {
          alert("User does not exist");
          return;
        }

        // Compare the entered password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(
          snap.password,
          user.password
        );

        if (!passwordMatch) {
          alert("Incorrect password");
          return;
        }

        // User exists, and password matches
        sessionStorage.setItem("id", user.id); // Correctly store the matched user's ID
        alert("Login Successfully");
        usersData.userName = userName;
        navigate("/"); // Ensure `navigate` is defined elsewhere in your code
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("An error occurred while processing your request.");
      }
    }
  };

  const validate = () => {
    let result = true;
    if (!snap.password) {
      result = false;
      alert("Enter Password");
    }
    if (!snap.userName) {
      result = false;
      alert("Enter User Name");
    }
    return result;
  };

  return (
    <div className="flex justify-center mt-40">
      {/* sign in */}
      <form
        onSubmit={proceedSignin}
        className={`flex items-center absolute w-[800px] h-[400px] overflow-hidden duration-200 shadow-md`}
      >
        <section className="flex flex-col gap-5 bg-[#fffbfb] w-[400px] h-[100%] p-10 rounded-l-md shadow-md border-t border-b border-l">
          <h1 className="text-xl text-slate-700 font-bold pb-5">Sign In</h1>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              User Name
            </p>
            <input
              type="text"
              required
              value={snap.userName}
              onChange={(e) => {
                usersData.userName = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              Password
            </p>
            <input
              type="password"
              required
              value={snap.password}
              onChange={(e) => {
                usersData.password = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <button
            type="submit"
            className="border p-1 rounded-md font-semibold border-red-500 hover:border-green-500 hover:text-green-600 hover:cursor-pointer duration-200 shadow-md"
          >
            Sign In
          </button>
          <div className="flex items-center justify-between pt-2">
            <section className="flex items-center justify-between pt-2">
              <input
                id="link-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                // value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
              />
              <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-blue-500 hover:cursor-pointer"
              >
                Remember Me
              </label>
            </section>
            <section className="flex items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  navigate("/login/forgot-password");
                }}
                className="text-sm font-semibold hover:text-red-500 hover:cursor-pointer duration-200"
              >
                Forgot Password
              </button>
            </section>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center bg-gradient-to-b from-red-400 to-red-600 w-[400px] h-[100%] p-10 shadow-md rounded-r-md border-t border-b border-r">
          <h1 className="text-2xl font-bold text-white">Welcome to Sign In</h1>
          <p className="text-sm text-white">Don't have an account?</p>
          <p className="text-xs text-white pt-3">
            Sign Up here <b>→</b>
            <button
              type="button"
              onClick={() => {
                usersData.userName = "";
                usersData.password = "";
                navigate("/login/signup");
              }}
              className="border p-2 mx-3 rounded-md font-bold hover:border-green-300 hover:text-green-300 hover:cursor-pointer duration-200 shadow-md"
            >
              Sign Up
            </button>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Signin;
