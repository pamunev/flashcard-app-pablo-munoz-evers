import React from "react";
import { Link } from "react-router-dom";

function CreateDeckNavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> / Create Deck
    </nav>
  );
}

export default CreateDeckNavBar;
