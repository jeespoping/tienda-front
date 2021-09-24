import { createContext } from "react";

const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloaderUser: () => null,
});

export default AuthContext;
