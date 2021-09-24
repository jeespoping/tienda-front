import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import { setToken } from "../api/token";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUsr: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUsr: jwtDecode(token).id,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setReloadUser: () => null,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
