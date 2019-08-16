import React from "react";
import Header from "../Header";
import Login from "../Login";
import Footer from "../Footer";

function Home() {
  return (
    <div className="App">
      <Header branding="ACCIO" />
      <Login />
      <Footer />
    </div>
  );
}

export default Home;
