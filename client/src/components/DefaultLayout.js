import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="header flex justify-between p-5 shadow items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer ml-7" 
          onClick={() => navigate("/")}
        >
          <img src="/4.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold">
            <span className="text-black-600">BEAT</span>
            <span className="text-red-500">-DISTRICT</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* User Image */}
          <img
            src={user?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtYlMT_y-EHdA3AHXBo3PNPDApVNmmbAKSQ&s"} 
            alt="User"
            className="h-10 w-10 rounded-full border border-gray-300"
          />
          {/* User Name */}
          <h1 className="text-xl">{user?.name.toUpperCase()}</h1>
          {/* Logout Icon */}
          <i
            className="ri-logout-circle-r-line text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          ></i>
        </div>
      </div>
      <div className="content m-10">{children}</div>
    </div>
  );
}

export default DefaultLayout;
