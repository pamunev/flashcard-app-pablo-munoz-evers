import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { readDeck } from "../../utils/api"

// Should I add an abort controller somewhere?

function CreateDeckNavBar() {
    // Didn't actually need any of this for this one lol.
    
    /*const { deckId } = useParams()
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        readDeck(deckId)
        .then((data) => setDeck(data))
        .catch((error) => {
            console.log(error)
        })
    }, [deckId])

    if (!deck) {
        return <h2>Loading...</h2>
    }*/

    return (
        <nav>
            <Link to="/">Home</Link> / Create Deck
        </nav>
    )
}

export default CreateDeckNavBar