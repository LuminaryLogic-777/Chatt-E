// import { createContext, useCallback, useState } from "react";
// import { baseUrl, postReq } from "../utils/Services";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const navigate=useNavigate();
//   const [user, setUser] = useState(null);
//   const [register, setRegister] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [registerError, setRegisterError] = useState(null);
//   const [registerLoading, setRegisterLoading] = useState(false);
//   const [loginUser, setLoginUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [loginError, setLoginError] = useState(null);
//   const [loginLoading, setLoginLoading] = useState(false);

//   const updateLoginUser = useCallback((info) => {
//     setLoginUser(info);
//   }, []);

//   console.log("REGISTER INFO", register);
//   const updateRegister = useCallback((info) => {
//     setRegister(info);
//   }, []);

//   const loginUserDetails = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setLoginLoading(true);
//       setLoginError(null);
//       const res = await postReq(
//         `${baseUrl}/users/login`,
//         JSON.stringify(loginUser)
//       );
//       setRegisterLoading(false);
//       if (res.error) {
//         return setRegisterError(res);
//       }
//       localStorage.setItem("User", JSON.stringify(res));
//       setUser(res);
//     },
//     [loginUser]
//   );

//   const registerUser = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setRegisterLoading(true);
//       setRegisterError(null);
//       const res = await postReq(
//         `${baseUrl}/users/register`,
//         JSON.stringify(register)
//       );
//       setRegisterLoading(false);
//       if (res.error) {
//         return setRegisterError(res);
//       }
//       localStorage.setItem("User", JSON.stringify(res));
//       setUser(res);
//     },
//     [register]
//   );

//   const logoutUser = useCallback(async (e) => {
//     localStorage.removeItem("User");
//     setUser(null);
//   }, []);

  

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         register,
//         updateRegister,
//         registerUser,
//         registerError,
//         registerLoading,
//         logoutUser,
//         loginUser,
//         loginUserDetails,
//         updateLoginUser,
//         loginError,
//         loginLoading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, postReq } from "../utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();1
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const updateLoginUser = useCallback((info) => {
    setLoginUser(info);
  }, []);

  const updateRegister = useCallback((info) => {
    setRegister(info);
  }, []);

  const loginUserDetails = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);
      const res = await postReq(
        `${baseUrl}/users/login`,
        JSON.stringify(loginUser)
      );
      setLoginLoading(false);
      if (res.error) {
        return setLoginError(res);
      }
      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
    },
    [loginUser]
  );

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);
      const res = await postReq(
        `${baseUrl}/users/register`,
        JSON.stringify(register)
      );
      setRegisterLoading(false);
      if (res.error) {
        return setRegisterError(res);
      }
      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
    },
    [register]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        updateRegister,
        registerUser,
        registerError,
        registerLoading,
        logoutUser,
        loginUser,
        loginUserDetails,
        updateLoginUser,
        loginError,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
