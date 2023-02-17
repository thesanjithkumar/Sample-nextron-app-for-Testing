import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/common/navbar/Navbar";
import Images from "../components/images/Images";

function About() {
  return (
    <div>
      <Head>
        <title>Images</title>
      </Head>
      <Navbar />
      <div>
        <Images />
      </div>
    </div>
  );
}

export default About;
