/*
PATH: /decks/:deckId/cards/new

Use readDeck() function from src/utils/api/index.js.

Breadcrumb navigation bar with link to home, deck to which cards are being added, 
and the text "Add Card".

Title: "React Router: Add Card" (or whatever the title is of that particular deck.)

A form with "front" and "back" fields for the card, with a <textarea> tag. 

If you click SAVE, a new card is created and associated with the relevant deck. 
Then the form is cleared and the process to add a card is restarted. 

If you click DONE, it takes you to the DECK screen. 

BASICALLY:
1. Breadcrumb navigation bar
2. Title
3. Form with SAVE and DONE buttons (Rendered from "Form" folder)
*/

import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { readDeck } from "../../utils/api"
import CreateCardNavBar from "./CreateCardNavBar"
import { createCard } from "../../utils/api"
import CardForm from "../Form"



function AddCard() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
        }
        fetchData() 
    }, [deckId])

    if (!deck) {
        return <h3>Loading...</h3>
    }



    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        /*const updatedDeck = {
            ...deck,
            cards: [
                ...deck.cards,
                {
                    front: formData.front,
                    back: formData.back
                }
            ]
        }*/

        //setDeck(updatedDeck)
        await createCard(deckId, formData)
        

        setFormData({
            front: "",
            back: ""
        })
    }

    return (
        <>
            <CreateCardNavBar deck={deck} />
            <br />
            <h3>{deck.name}: Add Card</h3>
            <br />
            <CardForm handleChange={handleChange} formData={formData} />
            <br />
            <button onClick={handleSubmit}>Save</button>
            <Link to={`/decks/${deckId}`}>
                <button>Done</button>
            </Link>

        </>
    )
}

export default AddCard;