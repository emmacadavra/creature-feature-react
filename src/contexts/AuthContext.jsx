import React, { useMemo } from "react";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { axiosReq, axiosResp } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosResp.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (error) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axiosResp.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      },
    );
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
