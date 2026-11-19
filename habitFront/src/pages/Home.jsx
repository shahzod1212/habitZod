import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user.username);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
      <Navbar />
      <Header />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
