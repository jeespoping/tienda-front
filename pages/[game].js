import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";

export default function Game() {
  const { query } = useRouter();
  return <BasicLayout>Game</BasicLayout>;
}
