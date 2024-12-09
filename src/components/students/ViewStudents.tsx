import { useSnapshot } from "valtio";
import { studentData } from "../../store/StudentData";
import { useEffect } from "react";

const ViewStudents = () => {
  const snap = useSnapshot(studentData);

  return (
    <div className="flex flex-col gap-3">
      <section className="grid grid-cols-2 gap-3">
        <span className="relative rounded-lg shadow-md">
          <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
            Last Name
          </p>
          <input
            type="text"
            readOnly
            value={snap.lastName}
            onChange={(e) => {
              studentData.lastName = e.target.value;
            }}
            className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
        <span className="relative rounded-lg shadow-md">
          <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
            First Name
          </p>
          <input
            type="text"
            readOnly
            value={snap.firstName}
            onChange={(e) => {
              studentData.firstName = e.target.value;
            }}
            className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
      </section>
      <section className="grid grid-cols-2 gap-3">
        <span className="relative rounded-lg shadow-md">
          <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
            Middle Name
          </p>
          <input
            type="text"
            readOnly
            value={snap.middleName}
            onChange={(e) => {
              studentData.middleName = e.target.value;
            }}
            className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
        <span className="relative rounded-lg shadow-md">
          <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
            Sex
          </p>
          <input
            type="text"
            readOnly
            value={snap.sex}
            onChange={(e) => {
              studentData.sex = e.target.value;
            }}
            className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
          />
        </span>
      </section>
      <span className="relative rounded-lg shadow-md">
        <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
          Email
        </p>
        <input
          type="email"
          readOnly
          value={snap.email}
          onChange={(e) => {
            studentData.email = e.target.value;
          }}
          className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
        />
      </span>
    </div>
  );
};

export default ViewStudents;
