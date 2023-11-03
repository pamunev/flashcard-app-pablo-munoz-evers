import React from "react";

function CardForm({ handleChange, formData }) {
  return (
    <form>
      <label htmlFor="front">Front</label>
      <br />
      <textarea
        type="text"
        name="front"
        value={formData.front}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea
        type="text"
        name="back"
        value={formData.back}
        onChange={handleChange}
      />
    </form>
  );
}

export default CardForm;
