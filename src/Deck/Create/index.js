// I think this should be the CreateDeck file. 
/* The path to this should be /decks/new
Add a breadcrumb navigation bar with a link to HOME
followed by the the text "Create Deck"
- Create a form. It should have fields to create a new deck. 
-- Check about what kinds of text areas each should be. 
-- The name should be a simple <input>, the other one should be <textarea>.
- If they click SUBMIT, it takes them to the DECK screen. Where is that?
- If they click CANCEL, it takes them to the HOME screen. 

- And then submitting the form should change the state. 
- Which state? State of the decks array?

- Designing the form itsef should be easy. Just need to figure out how to add the 
submit handler. 

- SUBMIT links to "/decks/:deckId". Or, onClick=sets state, and then routes to 
that page using history.push().
- CANCEL links to "/".

BASICALLY:
1. Breadcrumb navigation bar.
2. Title ("Create Deck")
3. Form (with buttons). 

*/
import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import CreateDeckNavBar from "./CreateDeckNavBar";
import { createDeck } from "../../utils/api";

function CreateDeck() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const history = useHistory()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const addData = await createDeck(formData)
        history.push(`/decks/${addData.id}`)
    }

    return (
        <>
            <CreateDeckNavBar />
            <h2>Create Deck</h2>
            <form>
                <label for="name">Name:</label>
                <br />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />
                <label for="description">Description:</label>
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
    )

}

export default CreateDeck;