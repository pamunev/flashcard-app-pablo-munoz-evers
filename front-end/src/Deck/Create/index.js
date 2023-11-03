import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import CreateDeckNavBar from "./CreateDeckNavBar";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const addData = await createDeck(formData);
    history.push(`/decks/${addData.id}`);
  };

  return (
    <>
      <CreateDeckNavBar />
      <h2>Create Deck</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    </>
  );
}

export default CreateDeck;
