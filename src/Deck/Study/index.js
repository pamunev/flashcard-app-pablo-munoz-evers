import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyNavBar from "./StudyNavBar"

function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNum, setCardNum] = useState(1);
  const [front, isFront] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setCards(response.cards);
      return () => abortController.abort();
    }
    fetchData();
  }, []);

  function nextCard(index, total) {
    console.log(index);
    if (index < total) {
      setCardNum(cardNum + 1);
      isFront(true);
    } else {
      if (
        window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to the home page`
        )
      ) {
        setCardNum(1);
        isFront(true);
      } else {
        history.push("/");
      }
    }
  }

  function flipCard() {
    if (front) {
      isFront(false);
    } else {
      isFront(true);
    }
  }

  function showNextButton(cards, index) {
    if (front) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(index + 1, cards.length)}
        >
          Next
        </button>
      );
    }
  }

  function enoughCards() {
    return (
      <div className="card">
        {cards.map((card, index) => {
          if (index === cardNum - 1) {
            return (
              <div className="card-body" key={card.id}>
                <h3 className="card-title">
                  {`Card ${index + 1} of ${cards.length}`}
                </h3>
                <div className="card-text">
                  {front ? card.front : card.back}
                </div>
                <br />
                <button onClick={flipCard}>
                  Flip
                </button>
                {showNextButton(cards, index)}
              </div>
            );
          }
        })}
      </div>
    );
  }

  function notEnoughCards() {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link
          to={`/decks/${deck.id}/cards/new`}
          >
          <button>Add Cards</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <StudyNavBar />
      <br />
      <div>
        <h2>{`${deck.name}: Study`}</h2>
        <br />
        <div>
          {cards.length === 0
            ? notEnoughCards()
            : cards.length > 2
            ? enoughCards()
            : notEnoughCards()}
        </div>
      </div>
    </div>
  );
}

export default Study;