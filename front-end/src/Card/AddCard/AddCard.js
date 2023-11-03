import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CreateCardNavBar from "./AddCardNavBar";
import { createCard } from "../../utils/api";
import CardForm from "../Form";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchData();
  }, [deckId]);

  if (!deck) {
    return <h3>Loading...</h3>;
  }

  // Change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createCard(deckId, formData);

    setFormData({
      front: "",
      back: "",
    });
  };

  return (
    <>
      <CreateCardNavBar deck={deck} />
      <br />
      <h3>
        {deck.name}: <span>Add Card</span>
      </h3>
      <br />
      <CardForm handleChange={handleChange} formData={formData} />
      <br />
      <button onClick={handleSubmit}>Save</button>
      <Link to={`/decks/${deckId}`}>
        <button>Done</button>
      </Link>
    </>
  );
}

export default AddCard;
