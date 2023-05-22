import React from "react";
import { Link } from "react-router-dom";
import "../../public/index.css";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <h1>Workout App</h1>
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
