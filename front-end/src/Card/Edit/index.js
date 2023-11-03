import React, { useEffect, useState } from "react";
import EditCardNavBar from "./EditCardNavBar";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "../Form";

function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const dataDeck = await readDeck(deckId);
      setDeck(dataDeck);
    };
    fetchData();
    console.log(deck);
  }, [deckId]);

  useEffect(() => {
    const fetchData = async () => {
      const dataCard = await readCard(cardId);
      setCard(dataCard);
      setFormData({
        id: dataCard.id,
        deckId: dataCard.deckId,
        front: dataCard.front,
        back: dataCard.back,
      });
    };
    fetchData();
  }, [cardId]);

  if (!deck || !card) {
    return <h3>Loading...</h3>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({
      ...formData,
      id: cardId,
    });
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <EditCardNavBar deck={deck} card={card} />
      <br />
      <h3>Edit Card</h3>
      <br />
      <CardForm handleChange={handleChange} formData={formData} />
      <br />
      <Link to={`/decks/${deckId}`}>
        <button>Cancel</button>
      </Link>
      <button onClick={handleSubmit}>Save</button>
    </>
  );
}

export default EditCard;
