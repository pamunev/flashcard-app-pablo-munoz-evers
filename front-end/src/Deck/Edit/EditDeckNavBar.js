import React from "react"
import { Link } from "react-router-dom"

function EditDeckNavBar({deck}) {
    return (
    <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Deck
    </nav>
    )
}

export default EditDeckNavBar