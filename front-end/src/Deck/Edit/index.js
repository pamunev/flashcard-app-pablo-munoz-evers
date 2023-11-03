import React, { useState, useEffect } from "react";
import EditDeckNavBar from "./EditDeckNavBar";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
      setFormData({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    };
    fetchData();
  }, []);

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
    await updateDeck(formData);
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <EditDeckNavBar deck={deck} />
      <br />
      <form>
        <label for="name">Name</label>
        <br />
        <textarea
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label for="description">Description</label>
        <br />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <Link to={`/decks/${deckId}`}>
          <button>Cancel</button>
        </Link>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}

export default EditDeck;
