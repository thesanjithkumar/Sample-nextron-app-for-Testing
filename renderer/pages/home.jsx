import React from "react";
import Head from "next/head";
// import Link from "next/link";
import s from "../styles/base.module.css";
import Navbar from "../components/common/navbar/Navbar";
function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <Navbar />
        <div className="grid">
          <h1>Home Page</h1>
          <form>
            <div className={`${s.nameDiv}`}>
              <label htmlFor="Name" className={`${s.name}`}>
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Name"
                style={{ width: "100%" }}
              />
              <label htmlFor="Email" className={`${s.name}`}>
                Email
              </label>
              <input
                type="text"
                id="Name"
                name="Email"
                placeholder="Email"
                style={{ width: "100%" }}
              />
              <label htmlFor="subject" className={`${s.name}`}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                style={{ width: "100%" }}
              />
              <label htmlFor="note" className={`${s.name}`}>
                Note:
              </label>
              <textarea
                id="w3review"
                name="message"
                style={{ width: "100%", maxHeight: "100px" }}
              ></textarea>
              <button type="submit" className={`${s.submit}`}>
                <a href="/next">Submit</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
