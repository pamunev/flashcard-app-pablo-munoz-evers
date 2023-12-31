import React from "react";
import { Link } from "react-router-dom";

function CardList({ deck, handleDeleteCard }) {
  // Delete handler
  const handleDelete = async (cardId) => {
    handleDeleteCard(cardId);
  };

  return (
    <>
      {deck.cards ? (
        deck.cards.map((card) => {
          return (
            <div className="card" key={card.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="align-content-left">{card.front}</p>
                  <p className="align-content-right">{card.back}</p>
                </div>
                <div className="float-right">
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CardList;
