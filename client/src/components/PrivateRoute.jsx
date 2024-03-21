import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserProfileQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const PrivateRoute = () => {
  const state = useSelector((state) => state.auth);
  const { userInfo } = state;
  // const { data: user, isLoading } = useGetUserProfileQuery();

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
