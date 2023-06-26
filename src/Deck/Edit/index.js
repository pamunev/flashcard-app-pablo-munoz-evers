/* 
PATH: /decks/:deckId/edit
Use readDeck() function from src/utils/api/index.js to load the existing deck.

Breadcrumb bar should have a link to home, then a link to the deck that's being 
edited, then the text "Edit Deck".

Displays the same form as the Create Deck screen, except it's prefilled with info
from the existing deck. 
(FIGURE OUT how to prefill a form.)

User can edit and update the form. (change the STATE of the form?)
This is triggered by the SUBMIT button (it doesn't say where that should take you.)
There is also a CANCEL button, which takes you to the DECK screen (/decks/:deckId)

BASICALLY:
1. Breadcrumb navigation bar
2. Form from Create Deck, but prefilled.
3. SUBMIT and CANCEL buttons. 


*/

import React, { useState, useEffect } from "react"
import EditDeckNavBar from "./EditDeckNavBar";
import { Link } from "react-router-dom"
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api"

function EditDeck() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: ""})
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
            setFormData({
                id: data.id,
                name: data.name,
                description: data.description
            })
        }
        fetchData()
    }, [])

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
        await updateDeck(formData)
        history.push(`/decks/${deckId}`)
    }


    return (
        <>
            <EditDeckNavBar deck={deck}/>
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
    
    )
}

export default EditDeck;