import React from "react"
import { Link } from "react-router-dom"

function ViewNavBar({deck}) {
    return (
        <nav>
            <Link to="/">Home</Link> / {deck.name}
        </nav>
    )
}

export default ViewNavBar