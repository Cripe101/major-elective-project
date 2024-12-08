import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="m-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
