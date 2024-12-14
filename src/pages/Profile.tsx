import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import { useNavigate } from "react-router";

const Profile = () => {
  const [users, setUsers] = useState<typeof usersData>();
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();
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
      });
  }, []);

  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col gap-5 bg-blue-50 p-7 rounded-md shadow-md w-[500px]">
        <p className="text-center font-bold text-lg pb-3">Profile</p>
        <section className="grid grid-cols-3 gap-2">
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              L. Name
            </p>
            <input
              type="text"
              readOnly
              value={users?.lastName}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              F. Name
            </p>
            <input
              type="text"
              readOnly
              value={users?.firstName}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              M. Name
            </p>
            <input
              type="text"
              readOnly
              value={users?.middleName}
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
              readOnly
              value={users?.phoneNum}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50">
              User Name
            </p>
            <input
              type="text"
              readOnly
              value={users?.userName}
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
            readOnly
            value={users?.email}
            className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
        <section className="flex justify-center">
          <button
            onClick={() => {
              usersData.confirmPassword = "";
              usersData.newPassword = "";
              navigate("/update-profile");
            }}
            type="button"
            className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[40%] bg-gradient-to-b from-cyan-300 to-cyan-500  hover:bg-gradient-to-b hover:from-green-300 hover:to-green-500 duration-200 shadow-md"
          >
            Edit
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;
