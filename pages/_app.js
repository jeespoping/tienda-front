import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import { useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const authData = useMemo(
    () => ({
      auth: { name: "Jesus", email: "jeespoping@gmail.com" },
      login: () => null,
      logout: () => null,
      setReloadUser: () => null,
    }),
    []
  );

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
