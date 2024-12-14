import { useNavigate } from "react-router";
import { usersData } from "../store/UsersData";

const Navbar = () => {
  const navigate = useNavigate();
  // const id = sessionStorage.getItem("id");
  return (
    <div className="flex justify-between py-3 border-b fixed top-0 left-0 z-50 w-full bg-white">
      <section>
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-lg font-serif font-bold text-blue-700 bg-blue-50 px-5 py-2 rounded-r-lg hover:px-7 cursor-pointer duration-200"
        >
          Project
        </h1>
      </section>
      <section className="flex gap-5 pr-5">
        <button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          className="text-Base font-bold hover:scale-105 hover:text-red-600 duration-200"
        >
          Home
        </button>

        <button
          onClick={() => {
            navigate("/profile");
          }}
          type="button"
          className="text-Base font-bold hover:scale-105 hover:text-red-600 duration-200"
        >
          Profile
        </button>
        <button
          onClick={() => {
            navigate("/archived");
          }}
          type="button"
          className="text-Base font-bold hover:scale-105 hover:text-red-600 duration-200"
        >
          Archived
        </button>

        <button
          onClick={() => {
            sessionStorage.removeItem("id");
            usersData.password = "";
            navigate("/login");
          }}
          type="button"
          className="text-Base font-bold hover:scale-105 hover:text-red-600 duration-200"
        >
          Logout
        </button>
      </section>
    </div>
  );
};

export default Navbar;
