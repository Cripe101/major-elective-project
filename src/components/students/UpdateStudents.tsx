import { useSnapshot } from "valtio";
import { studentData } from "../../store/StudentData";
import { useEffect } from "react";

const UpdateStudents = () => {
  const snap = useSnapshot(studentData);

  return (
    <div className="grid grid-cols-1 gap-3">
      <span className="relative rounded-lg shadow-md">
        <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
          Last Name
        </p>
        <input
          type="text"
          required
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
          required
          value={snap.firstName}
          onChange={(e) => {
            studentData.firstName = e.target.value;
          }}
          className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
        />
      </span>
      <span className="relative rounded-lg shadow-md">
        <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
          Middle Name
        </p>
        <input
          type="text"
          value={snap.middleName}
          onChange={(e) => {
            studentData.middleName = e.target.value;
          }}
          className="border border-green-500 h-[35px] w-[100%] bg-red-50 py-1 rounded-md font-bold text-center overflow-hidden px-1 "
        />
      </span>
      <span className="relative rounded-lg shadow-md">
        <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-50">
          Email
        </p>
        <input
          type="email"
          required
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

export default UpdateStudents;
