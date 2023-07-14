import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Layout/Spinner";
import { toast } from "react-hot-toast";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios
        .get("/api/v1/auth/admin-auth", {
          // we replace this in auth.jsx by axios defaults
          // headers: {
          //   Authorization: auth?.token,
          // },
        })
        .catch((err) => {
          toast.error(err.response?.data?.message);
        });

      if (response.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
