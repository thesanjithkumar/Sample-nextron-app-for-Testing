import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/common/navbar/Navbar";
import Todo from "../components/Todo/Todo";

function Next() {
  return (
    <React.Fragment>
      <Head>
        <title>Todo Page</title>
      </Head>
      <Navbar />
      <div>
        <Todo />
      </div>
    </React.Fragment>
  );
}

export default Next;
