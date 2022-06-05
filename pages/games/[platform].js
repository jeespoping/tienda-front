import React from "react";
import BasicLayagout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";

export default function Platform() {
  const { query } = useRouter();
  return (
    <BasicLayagout className="platform">
      <h1>Estamos en la plataforma : {query.platform}</h1>
    </BasicLayagout>
  );
}
