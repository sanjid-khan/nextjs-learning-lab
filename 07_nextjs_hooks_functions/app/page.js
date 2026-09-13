"use client";

import { redirect } from "next/navigation";

export default function Home() {

  const isLoggedIn = true;

  if(!isLoggedIn){
    redirect("/login");
  }

  return (
    <h1>Current Pathname</h1>
  );
}
