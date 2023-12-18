import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../../context/authProvider";

const Authenticated = () => {
  const { user } = useContext(authContext);
  return user?.username ? <Outlet /> : <Navigate to="/login" />;
};

export default Authenticated;
