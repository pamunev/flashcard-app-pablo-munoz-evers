import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const data = await listDecks();
      setAllDecks(data);
    };
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (deck) => {
    const confirmDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (confirmDelete) {
      await deleteDeck(deck.id);
      setAllDecks(allDecks.filter((d) => d.id !== deck.id));
      history.push("/");
    }
  };

  function loadDecks() {
    listDecks().then(setAllDecks);
  }

  return (
    <>
      {allDecks.map((deck) => {
        return (
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h3 className="card-title">{deck.name}</h3>
              <div>{deck.cards.length} cards</div>
            </div>
            <div className="card-body">
              <p>{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn-link-text">
                <button>View</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn-link-text">
                <button>Study</button>
              </Link>
              <button
                onClick={() => handleDelete(deck)}
                className="float-right"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DeckList;
