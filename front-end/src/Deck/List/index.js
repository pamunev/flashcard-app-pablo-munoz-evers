import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";
console.log("react:", React);

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);

  const history = useHistory();

  /*When using my own API: In the useEffect below, add the following lines
  bellow the response = await listDecks():
  const { data } = response;
      console.log("data from API:", data);
  then change setAllDecks(response)
  to setAllDecks(data). This is how it should interact properly with my 
  API as it is. However, I'm changing it for now because of how the Thinkful 
  API for this app is configured -- it returns data in a different format.
  2/29/24.
*/
  useEffect(() => {
    const fetchData = async () => {
      const response = await listDecks();
      console.log("API initial response:", response);
      setAllDecks(response);
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

  if (!allDecks) {
    return <p>Loading...</p>;
  }

  console.log("potato", allDecks);

  return (
    <div>
      {allDecks.map((deck) => {
        return (
          <div className="card" key={deck.id}>
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
    </div>
  );
}

export default DeckList;
