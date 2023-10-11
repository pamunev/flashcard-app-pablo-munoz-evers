import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck } from "../../utils/api";

function StudyNavBar() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    readDeck(deckId)
      .then((data) => setDeck(data))
      .catch((error) => {
        return <h2>404 Not Found</h2>;
      });
  }, [deckId]);

  if (!deck) {
    return <h2>Loading...</h2>;
  }

  return (
    <nav>
      <Link to="/">Home</Link> /{" "}
      <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Study
    </nav>
  );
}

export default StudyNavBar;
