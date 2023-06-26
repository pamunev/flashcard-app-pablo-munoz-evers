import React from "react"
import { Link } from "react-router-dom"

function EditCardNavBar({deck, card}) {
    return (
    <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Card: {card.id}
    </nav>
    )
}

export default EditCardNavBar