import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null); // to store the fetched user data
  const [loading, setLoading] = useState(true); // handle loading state

  const userName = sessionStorage.getItem("userName");

  // If userName is not in sessionStorage, navigate to login page.
  useEffect(() => {
    if (!userName) {
      navigate("/login"); // redirect to login if user is not logged in
      return;
    }

    // Fetch user data from backend by userName
    fetch(`http://localhost:8000/users?userName=${userName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const fetchedUser = data[0];
          setUserData(fetchedUser); // Store user data in state
          // Prepopulate the form fields from fetched user data
          usersData.id = fetchedUser.id;
          usersData.firstName = fetchedUser.firstName;
          usersData.lastName = fetchedUser.lastName;
          usersData.middleName = fetchedUser.middleName;
          usersData.phoneNum = fetchedUser.phoneNum;
          usersData.email = fetchedUser.email;
          usersData.password = fetchedUser.password; // Assuming password is hashed
        } else {
          alert("User not found.");
          navigate("/login");
        }
        setLoading(false); // stop loading when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        alert("Error fetching user data.");
        navigate("/login");
      });
  }, [navigate, userName]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if userData is loaded
    if (!userData) {
      alert("User data not loaded yet.");
      return;
    }

    // Log to check if we have the correct updated data
    console.log("Updated User Data before submitting:", {
      ...userData,
      firstName: snap.firstName,
      lastName: snap.lastName,
      middleName: snap.middleName,
      phoneNum: snap.phoneNum,
      email: snap.email,
      password: snap.newPassword, // Add new password here
      id: snap.id, // Make sure the userName is correct
    });

    // Compare old password to ensure the user is allowed to update the password
    const match = await bcrypt.compare(snap.confirmPassword, userData.password);

    if (match) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(snap.newPassword, saltRounds);

      // Create an updated user object with the new fields
      const updatedUser = {
        ...userData, // Spread the old data
        password: hashedPassword, // Update the password
        firstName: snap.firstName,
        lastName: snap.lastName,
        middleName: snap.middleName,
        phoneNum: snap.phoneNum,
        email: snap.email,
        id: snap.id, // Set the id explicitly to userName
      };

      console.log("User data to be updated:", updatedUser); // Log the data before the update

      // Update the user data on the backend
      fetch(`http://localhost:8000/users/${userData.id}`, {
        method: "PATCH", // Use PUT to update the entire user data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => {
          if (res.ok) {
            usersData.id = "";
            usersData.firstName = "";
            usersData.lastName = "";
            usersData.middleName = "";
            usersData.phoneNum = "";
            usersData.email = "";
            usersData.confirmPassword = "";
            usersData.password = "";
            alert("Profile updated successfully.");
            sessionStorage.removeItem("userName"); // Remove session data
            navigate("/login"); // Navigate to login after update
          } else {
            alert(`Error updating profile: ${res.status}`);
          }
        })
        .catch((err) => {
          console.error("Error updating user", err);
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
              value={snap.lastName}
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
              value={snap.firstName}
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
              value={snap.middleName}
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
              value={snap.phoneNum}
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
              readOnly
              value={snap.id}
              onChange={(e) => {
                usersData.id = e.target.value;
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
            value={snap.email}
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
              value={snap.confirmPassword}
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
              value={snap.newPassword}
              onChange={(e) => {
                usersData.newPassword = e.target.value;
              }}
              className="border bg-blue-50 border-green-500 h-[35px] w-[100%] py-1 shadow-md rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
        </section>
        <section className="flex justify-center">
          <button
            type="submit"
            className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[25%] bg-gradient-to-b from-cyan-300 to-cyan-500  hover:bg-gradient-to-b hover:from-green-300 hover:to-green-500 duration-200 shadow-md"
          >
            Save
          </button>
        </section>
      </form>
    </div>
  );
};

export default UpdateProfile;
