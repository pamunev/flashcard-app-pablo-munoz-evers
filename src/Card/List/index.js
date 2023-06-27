/* I think this should render all the cards in the current deck.
CardList

I think the following should be rendered from the "../Card/List" folder:
- Every card in the deck listed under the title. Each card:
1. Has a question and an answer on it. 
2. Has an Edit button that links to Edit Card screen.
3. Has a Delete button that brings up the Delete card prompt. 

Oh. It's deck.cards. I just map that. 
*/

import React, { useState } from "react"
import { readDeck, readCard, deleteCard } from "../../utils/api"
import { Link } from "react-router-dom"

function CardList({ deck, handleDeleteCard }) {
    //const [card, setCard] = useState([])
    //const allCards = deck.cards
    //const [deck, setDeck] = useState(deck)

// Not sure how to get the Edit button to be in the next line, under the content. 
    const handleDelete = async (cardId) => {
        handleDeleteCard(cardId)
    }

    return (
        <>
        {deck.cards ? (
            deck.cards.map((card) => {
            return (
            <div className="card" key={card.id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="align-content-left">{card.front}</p>
                        <p className="align-content-right">{card.back}</p>
                    </div>
                    <div className="float-right">
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(card.id)}>Delete</button>
                    </div>
                </div>

            </div>
            )
        })
        ) : (
            <p>Loading...</p>
        )}
        </>
    )
}

export default CardList