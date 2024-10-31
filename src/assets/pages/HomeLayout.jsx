import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "../../components";
const HomeLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <section className="page">
        {isLoading ? <div className="loading"></div> : <Outlet />}
      </section>
      <footer>footer</footer>
    </>
  );
};

export default HomeLayout;
