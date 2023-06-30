/*
This is where the Card Create form goes. 

Actually, this is where the form should go for Create and Edit Cards. 
That means that that component should be called in:
1. Card/Create
2. Card/Edit
*/

import React from "react"

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
    )
}

export default CardForm