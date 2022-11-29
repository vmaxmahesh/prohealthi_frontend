import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { toast, ToastContainer } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [errors, setError] = useState(false);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data2) => {

    fetch(process.env.REACT_APP_API_BASEURL + '/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data2)
    })
      .then(async response => {

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (response.ok) {
          setUser(data.data);
          console.log(user);
          navigate("/dashboard");
        } else {
          console.log(data);
          // setError(data.data)
          toast.error(data.error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

          });

        }

      })

      .catch(e => {
        // console.log('API response failed.')
        console.log(e)
      });


  };

  // call this function to sign out logged in user
  const logout = (e) => {
    e.preventDefault();
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      errors,
      user,
      login,
      logout
    }),
    [user, errors]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};