import { useSnapshot } from "valtio";
import { studentData } from "../store/StudentData";
import AddStudents from "./AddStudents";
import { usersData } from "../store/UsersData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { randomUUID } from "crypto";

const Students = () => {
  const [students, setStudents] = useState<(typeof studentData)[]>();
  const student = useSnapshot(studentData);
  const open = useSnapshot(usersData);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await fetch("http://localhost:8000/students/" + id, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Successfully Deleted Student");
    } else {
      alert("Error");
    }
  };

  const handleSubmit = async () => {
    studentData.id = String(Math.random().valueOf());
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
        console.log(student, " Student");
      })
      .catch(() => {
        alert("Failed to fetch Students");
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-red-50 p-10 rounded-lg shadow-md">
        <span className="flex flex-col items-center ">
          <section className="flex justify-evenly w-[100%]">
            <button
              type="button"
              onClick={() => {
                usersData.open = false;
              }}
              className="p-1 text-slate-50  rounded-md font-bold hover:cursor-pointer w-[200px] bg-gradient-to-b from-red-500 to-red-400  hover:from-green-300 hover:to-green-500 active:shadow duration-200 shadow-md"
            >
              Add Student
            </button>
            <h1 className=" text-center font-bold text-lg w-[100%]">
              All Students
            </h1>
            <section className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 w-[150px] rounded-l-md border-2 border-black text-center"
              />
              <button className="p-1 border-2 border-black bg-black font-bold text-white rounded-r-md hover:text-green-200 duration-200">
                Search
              </button>
            </section>
          </section>
          <section className="flex w-[100%] py-5">
            <h1 className="font-semibold text-start w-[40%]">Full Name</h1>
            <h1 className="font-semibold text-start w-[50%]">Email</h1>
          </section>
        </span>
        <div className=" flex flex-col gap-2 items-center w-[1000px] h-[350px] overflow-auto no-scrollbar">
          <span className="flex flex-col justify-center w-[100%]">
            {students?.map((student) => (
              <form
                key={student.id}
                className="flex justify-between items-center"
              >
                <section className="flex w-[100%] border-b-2 hover:border-b-green-400 duration-200 py-2">
                  <p className="  text-start w-[50%]">
                    {student?.lastName} {student?.firstName}{" "}
                    {student?.middleName[0]} .
                  </p>
                  <p className="  text-start w-[50%]">{student?.email}</p>
                </section>
                <section className="flex py-2">
                  <button
                    type="button"
                    className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-400 to-green-500  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      id = student?.id;
                      handleDelete();
                    }}
                    className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-red-500 to-red-400  hover:from-red-400 hover:scale-105 hover:to-red-500 active:shadow duration-200 shadow-md"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="p-1 text-slate-50 rounded-md font-bold hover:cursor-pointer w-[90px] ml-1 bg-gradient-to-b from-green-500 to-green-400  hover:from-green-400 hover:scale-105 hover:to-green-500 active:shadow duration-200 shadow-md"
                  >
                    View
                  </button>
                </section>
              </form>
            ))}
          </span>
          <form
            onSubmit={handleSubmit}
            className={`${
              open.open
                ? "opacity-0 w-0 left-0 top-1/2"
                : "w-[400px] opacity-100"
            } bg-red-50 p-10 rounded-md shadow-md flex flex-col absolute items-center overflow-hidden`}
          >
            <section className="flex justify-between w-[100%] items-center">
              <h1 className="font-bold pb-7 text-lg text-center">
                Add Student
              </h1>
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
              className="p-1 text-slate-50 mt-5 rounded-md font-bold hover:cursor-pointer w-[68%] bg-gradient-to-b from-red-500 to-red-400  hover:from-green-300 hover:to-green-500 active:shadow duration-200 shadow-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Students;
