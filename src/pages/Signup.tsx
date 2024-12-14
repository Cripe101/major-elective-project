import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

const Signup = () => {
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(snap.password)) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      if (snap.password === snap.confirmPassword) {
        const resp = await fetch("http://localhost:8000/users");
        const users = await resp.json();

        const userExists = users.some(
          (user: { userName: string }) => user.userName === snap.userName
        );

        if (!userExists) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            usersData.password,
            saltRounds
          );
          usersData.password = hashedPassword;

          const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersData),
          });
          // console.log(usersData);

          if (res.ok) {
            usersData.userName = "";
            usersData.firstName = "";
            usersData.lastName = "";
            usersData.middleName = "";
            usersData.phoneNum = "";
            usersData.email = "";
            usersData.password = "";
            usersData.confirmPassword = "";
            alert("Registered Successfully");
            navigate("/login");
          } else {
            alert(`error${res.status}`);
          }
        } else {
          alert("User Already Exist");
        }
      } else {
        alert("Failed to fetch data");
      }
    }
  };

  return (
    <div className="flex justify-center mt-40">
      {/* sign up */}
      <form
        onSubmit={handleSubmit}
        className={`flex w-[800px] h-[400px] items-center absolute overflow-hidden duration-200 shadow-md`}
      >
        <section className="flex flex-col items-center justify-center bg-gradient-to-b from-red-400 to-red-600 w-[400px] h-[100%] p-10 shadow-md rounded-l-md border-t border-b border-l">
          <h1 className="text-2xl font-bold text-white">Welcome to Sign Up</h1>
          <p className="text-sm text-white">Already have an account?</p>
          <p className="text-xs text-white pt-3">
            Sign In here <b>→</b>
            <button
              onClick={() => {
                navigate("/login");
              }}
              type="button"
              className="border p-2 mx-3 rounded-md font-bold hover:border-green-300 hover:text-green-300 duration-200 shadow-md"
            >
              Sign In
            </button>
          </p>
        </section>
        <div className="flex flex-col gap-3 bg-[#fffbfb] w-[400px] h-[100%] px-10 py-5 rounded-r-md shadow-md border-t border-b border-r">
          <h1 className="text-xl text-slate-700 font-bold pb-5">Sign Up</h1>
          <section className="grid grid-cols-3 gap-3">
            <span className="relative rounded-lg">
              <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                L. Name
              </p>
              <input
                type="text"
                required
                value={snap.lastName}
                onChange={(e) => {
                  usersData.lastName = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>
            <span className="relative rounded-lg">
              <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                F. Name
              </p>
              <input
                type="text"
                required
                value={snap.firstName}
                onChange={(e) => {
                  usersData.firstName = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>
            <span className="relative rounded-lg">
              <p className="text-xs text-center w-[55px] font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                M. Name
              </p>
              <input
                type="text"
                value={snap.middleName}
                onChange={(e) => {
                  usersData.middleName = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>
          </section>
          <section className="grid grid-cols-2 gap-3">
            <span className="relative rounded-lg">
              <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                Phone No.
              </p>
              <input
                type="number"
                value={snap.phoneNum}
                onChange={(e) => {
                  usersData.phoneNum = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>

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
          </section>

          <span className="relative rounded-lg">
            <p className="text-xs text-center font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              Recovery Text
            </p>
            <input
              type="text"
              required
              value={snap.recoveryPass}
              onChange={(e) => {
                usersData.recoveryPass = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>

          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              Email
            </p>
            <input
              type="email"
              required
              value={snap.email}
              onChange={(e) => {
                usersData.email = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>

          <section className="grid grid-cols-2 gap-3">
            <span className="relative rounded-lg">
              <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                Password
              </p>
              <input
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}"
                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                type="password"
                required
                value={snap.password}
                onChange={(e) => {
                  usersData.password = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>
            <span className="relative rounded-lg">
              <p className="text-xs w-[108px] text-center font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                Confirm Password
              </p>
              <input
                type="password"
                required
                value={snap.confirmPassword}
                onChange={(e) => {
                  usersData.confirmPassword = e.target.value;
                }}
                className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
              />
            </span>
          </section>

          <section className="flex px-2 gap-3 group">
            <input
              type="checkbox"
              required
              id="checkbox"
              className="group-hover:cursor-pointer"
            />
            <label
              htmlFor="checkbox"
              className="text-sm font-semibold font-mono group-hover:cursor-pointer"
            >
              Please check to proceed
            </label>
          </section>
          <button
            type="submit"
            className="border p-1 rounded-md font-semibold border-red-500 hover:border-green-500 hover:text-green-600 hover:cursor-pointer duration-200 shadow-md"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
