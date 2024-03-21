import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useValidateIsAdminQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

const AdminRoute = () => {
  const state = useSelector((state) => state.auth);
  const { userInfo } = state;
  const { data: user, isLoading } = useValidateIsAdminQuery();
  return isLoading ? (
    <Loader />
  ) : user?.isAdmin && userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
