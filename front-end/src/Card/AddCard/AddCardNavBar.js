import React from "react"
import { Link } from "react-router-dom"

function CreateCardNavBar({deck}) {
    return (
    <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Add Card
    </nav>
    )
}

export default CreateCardNavBar