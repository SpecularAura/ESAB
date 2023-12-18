import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const response = await fetch("/logout");
      navigate("/");
    };
    logout();
  }, []);
  return <></>;
};

export default Logout;
