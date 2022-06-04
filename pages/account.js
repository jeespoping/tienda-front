import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration user={user} />
    </BasicLayout>
  );
}

function Configuration({ user }) {
  return (
    <diV className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm user={user} />
      </div>
    </diV>
  );
}
