import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api";
import ViewNavBar from "./ViewNavBar";
import CardList from "../../Card/List";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchData();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (confirmDelete) {
      await deleteCard(cardId);
      const updatedDeck = { ...deck };
      updatedDeck.cards = updatedDeck.cards.filter((c) => c.id !== cardId);
      setDeck(updatedDeck);
    }
  };

  return (
    <>
      <ViewNavBar deck={deck} />
      <br />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button>Study</button>
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button>Add Cards</button>
      </Link>
      <br />
      <br />
      <h2>Cards</h2>
      <CardList deck={deck} handleDeleteCard={handleDeleteCard} />
    </>
  );
}

export default Deck;
