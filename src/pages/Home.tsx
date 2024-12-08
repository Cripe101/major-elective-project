import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Students from "../components/Students";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    let userName = sessionStorage.getItem("userName");
    setUser(userName);
    if (userName === "" || userName === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Students />
    </div>
  );
};

export default Home;
