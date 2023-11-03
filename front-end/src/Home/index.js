import React from "react";
import { Link } from "react-router-dom";
import DeckList from "../Deck/List";

function Home() {
  return (
    <>
      <Link to="/decks/new" className="btn-link-text">
        <button>Create Deck</button>
      </Link>
      <br />
      <br />
      <DeckList />
    </>
  );
}

export default Home;
