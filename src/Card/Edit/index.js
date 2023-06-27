/*
PATH: /decks/:deckId/cards/:cardId/edit

Use readDeck() function from src/utils/api/index.js.
Also use use the readCard() function from src/utils/api/index.js 
to load the card that you want to edit.

Breadcrumb nav bar with link to HOME, then to the name of the deck where this card 
belongs, and then the text "Edit Card :cardId". 

Same form as the Add Card screen, except it's prefilled. It can be edited and updated. 

If you click either SAVE or CANCEL, you're taken back to the DECK screen. 

BASICALLY:
1. Breadcrumb nav bar
2. Title "Edit Card"
3. Form with SAVE and CANCEL buttons (Rendered from "Form" folder)
*/

import React, { useEffect, useState } from "react"
import EditCardNavBar from "./EditCardNavBar";
import { useParams, Link, useHistory } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "../Form";

function EditCard() {
    const { deckId } = useParams()
    const { cardId } = useParams()
    const [deck, setDeck] = useState(null)
    const [card, setCard] = useState(null)
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    })
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const dataDeck = await readDeck(deckId)
            setDeck(dataDeck)
        }
        fetchData()
        console.log(deck)
    }, [deckId])

    useEffect(() => {
        const fetchData = async () => {
            const dataCard = await readCard(cardId)
            setCard(dataCard)
            setFormData({
                id: dataCard.id,
                deckId: dataCard.deckId,
                front: dataCard.front,
                back: dataCard.back
            })
        }
        fetchData()
    }, [cardId])

    if (!deck || !card) {
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
        await updateCard({
            ...formData,
            id: cardId
        })
        history.push(`/decks/${deckId}`)
    }

    // The problem is that in the cards that disappear, the deckId key is missing.
    // Success. 

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
    )
}

export default EditCard;