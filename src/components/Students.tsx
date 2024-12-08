import { useSnapshot } from "valtio";
import { studentData } from "../store/StudentData";
import AddStudents from "./AddStudents";
import { usersData } from "../store/UsersData";
import { useEffect, useState } from "react";
import { secureHeapUsed } from "crypto";

const Students = () => {
  const [students, setStudents] = useState<(typeof studentData)[]>();
  const student = useSnapshot(studentData);
  const open = useSnapshot(usersData);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  };

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setStudents(resp);
        console.log(resp);
        console.log(student);
      })
      .catch(() => {
        alert("Failed to fetch Students");
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col items-center bg-red-50 p-10 w-[1000px] h-[500px] rounded-lg shadow-md">
        <span className="flex flex-col justify-center w-[100%] relative overflow-auto no-scrollbar">
          <section className="flex justify-between fixed -transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={() => {
                usersData.open = false;
              }}
              className="p-1 text-slate-50 mt-5 rounded-md font-bold hover:cursor-pointer w-[200px] bg-gradient-to-b from-red-500 to-red-400  hover:from-green-300 hover:to-green-500 active:shadow duration-200 shadow-md"
            >
              Add Student
            </button>
            <h1 className="mt-10 text-center font-bold text-lg w-[100%]">
              All Students
            </h1>
            <section className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 mt-5 w-[150px] rounded-l-md border-2 border-black text-center"
              />
              <button className="p-1 mt-5 border-2 border-black bg-black font-bold text-white rounded-r-md hover:text-green-200 duration-200">
                Search
              </button>
            </section>
          </section>

          <span className="flex justify-between mt-5">
            <section className="flex w-[100%] mt-3">
              <h1 className="font-semibold text-start w-[40%]">Full Name</h1>
              <h1 className="font-semibold text-start w-[50%]">Email</h1>
            </section>
            <section className="flex mt-3">
              {/* <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-400 to-green-500  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md">
                Update
              </button>
              <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-red-500 to-red-400  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md">
                Delete
              </button>
              <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-500 to-green-400  hover:from-green-400 hover:scale-105 hover:to-green-500 active:shadow duration-200 shadow-md">
                View
              </button> */}
            </section>
          </span>
          {students?.map((student, index) => (
            <span key={index} className="flex justify-between mt-5">
              <section className="flex  w-[100%] mt-3 border-b-2 hover:border-b-green-400 duration-200">
                <p className="  text-start w-[50%]">
                  {student?.lastName} {student?.firstName}{" "}
                  {student?.middleName[0]} .
                </p>
                <p className="  text-start w-[50%]">{student?.email}</p>
              </section>
              <section className="flex mt-3">
                <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-400 to-green-500  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md">
                  Update
                </button>
                <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-red-500 to-red-400  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md">
                  Delete
                </button>
                <button className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-500 to-green-400  hover:from-green-400 hover:scale-105 hover:to-green-500 active:shadow duration-200 shadow-md">
                  View
                </button>
              </section>
            </span>
          ))}
        </span>
        <form
          onSubmit={handleSubmit}
          className={`${
            open.open ? "opacity-0 w-0 left-0 top-1/2" : "w-[300px] opacity-100"
          } bg-red-50 p-10 rounded-md shadow-md flex flex-col absolute items-center overflow-hidden`}
        >
          <section className="flex justify-between w-[100%] items-center">
            <h1 className="font-bold pb-7 text-lg text-center">Add Student</h1>
            <button
              type="button"
              onClick={() => {
                usersData.open = true;
              }}
              className="mb-7 font-bold py-1 px-3 rounded-md hover:text-red-500 duration-200 hover:bg-red-100"
            >
              X
            </button>
          </section>
          <AddStudents />
          <button
            type="submit"
            className="p-1 text-slate-50 mt-5 rounded-md font-bold hover:cursor-pointer w-[100%] bg-gradient-to-b from-red-500 to-red-400  hover:from-green-300 hover:to-green-500 active:shadow duration-200 shadow-md"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Students;
