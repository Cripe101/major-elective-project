import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Students from "../components/students/Students";

const Home = () => {
  const navigate = useNavigate();

  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!id) {
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
