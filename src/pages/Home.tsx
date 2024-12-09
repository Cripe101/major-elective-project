import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Students from "../components/students/Students";

const Home = () => {
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("userName");
  useEffect(() => {
    if (!userName) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div>
      <Students />
    </div>
  );
};

export default Home;
