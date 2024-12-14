import React, { useEffect, useState } from "react";
import { usersData } from "../store/UsersData";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const UpdateProfile = () => {
  const user = useSnapshot(usersData);
  const navigate = useNavigate();

  const [users, setUsers] = useState<typeof usersData>();
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/users/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUsers(resp);
        setLoading(false);
        if (!resp.ok) {
          usersData.lastName = resp.lastName;
          usersData.firstName = resp.firstName;
          usersData.middleName = resp.middleName;
          usersData.userName = resp.userName;
          usersData.email = resp.email;
          usersData.phoneNum = resp.phoneNum;

          // console.log(user.lastName);
        }
      })
      .catch(() => {
        alert("Error fetching user data.");
        navigate("/login");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!users) {
      alert("User data not loaded yet.");
      return;
    }

    const match = await bcrypt.compare(user.confirmPassword, users.password);

    if (match) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.newPassword, saltRounds);

      // console.log("This the Data", users);

      const updatedUser = {
        userName: user.userName,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNum: user.phoneNum,
        email: user.email,
      };

      fetch(`http://localhost:8000/users/` + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.removeItem("id");
            usersData.password = "";
            usersData.userName = "";
            alert("Profile updated successfully.");
            navigate("/login");
          } else {
            alert(`Error updating profile: ${res.status}`);
          }
        })
        .catch((err) => {
          // console.error("Error updating user", err);
          alert("An error occurred while updating the profile.");
        });
    } else {
      alert("Incorrect old password.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-blue-50 p-7 rounded-md shadow-md w-[500px]"
      >
        <p className="text-center font-bold text-lg pb-3">Profile</p>
        <section className="grid grid-cols-3 gap-2">
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              L. Name
            </p>
            <input
              type="text"
              value={user.lastName}
              required
              onChange={(e) => {
                usersData.lastName = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              F. Name
            </p>
            <input
              type="text"
              required
              value={user.firstName}
              onChange={(e) => {
                usersData.firstName = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              M. Name
            </p>
            <input
              required
              type="text"
              value={user.middleName}
              onChange={(e) => {
                usersData.middleName = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
        </section>
        <section className="grid grid-cols-2 gap-2">
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              Phone No.
            </p>
            <input
              type="number"
              value={user.phoneNum}
              required
              onChange={(e) => {
                usersData.phoneNum = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              User Name
            </p>
            <input
              type="text"
              required
              value={user.userName}
              onChange={(e) => {
                usersData.userName = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
        </section>
        <span className="relative rounded-lg">
          <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
            Email
          </p>
          <input
            type="text"
            required
            value={user.email}
            onChange={(e) => {
              usersData.email = e.target.value;
            }}
            className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
        <section className="grid grid-cols-2 gap-2">
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              Confirm Old Pass
            </p>
            <input
              required
              type="password"
              value={user.confirmPassword}
              onChange={(e) => {
                usersData.confirmPassword = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              New Password
            </p>
            <input
              required
              type="password"
              value={user.newPassword}
              onChange={(e) => {
                usersData.newPassword = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
        </section>
        <section className="flex justify-center gap-5">
          <button
            type="submit"
            className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[25%] bg-gradient-to-b from-cyan-300 to-cyan-500  hover:bg-gradient-to-b hover:from-green-300 hover:to-green-500 duration-200 shadow-md"
          >
            Save
          </button>
          <button
            onClick={() => {
              navigate("/profile");
            }}
            type="button"
            className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[25%] bg-gradient-to-b from-cyan-300 to-cyan-500  hover:bg-gradient-to-b hover:from-red-300 hover:to-red-500 duration-200 shadow-md"
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default UpdateProfile;
