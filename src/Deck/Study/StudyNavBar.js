/* Build the Nav Bar component here */

import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
//import Home from "../../Home"
import { readDeck } from "../../utils/api"

/*const breadcrumbLinks = [
    { label: "Home", url: "/" },

]*/

function StudyNavBar() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        readDeck(deckId)
        .then((data) => setDeck(data))
        .catch((error) => {
            return <h2>404 Not Found</h2>
        })
    }, [deckId])
    // Why do I use useEffect() here instead of 
    // just readDeck()?

    if (!deck) {
        return <h2>Loading...</h2>
    }

    return (
        <nav>
            <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Study
        </nav>
    )
}

export default StudyNavBar

/*  
it uses the readDeck() function from the utils/api folder. So import that. 
 */