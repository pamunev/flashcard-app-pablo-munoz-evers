// Is this the DECK screen?
/*There has to be a DECK screen. 
This should be a particular deck. 
PATH: /decks/:deckId
- I have to use the readDeck() function to load the existing deck. 

BASICALLY:
- A breadcrumb navigation bar, then:
- Deck name, then:
- Deck description
- 4 buttons
1. Edit - links to Edit Deck screen /decks/:deckId/edit
2. Study - links to /decks/:deckId/study (Study screen)
3. Add cards - links to Add Card screen /decks/:deckId/cards/new
4. Delete - Shows delete card prompt but for the deck.
- A "Cards" heading

I think the following should be rendered from the "../Card/List" folder:
- Every card in the deck listed under the title. Each card:
1. Has a question and an answer on it. 
2. Has an Edit button that links to Edit Card screen.
3. Has a Delete button that brings up the Delete card prompt. 

*/

import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { readDeck, deleteCard } from "../../utils/api"
import ViewNavBar from "./ViewNavBar"
import CardList from "../../Card/List"

function Deck() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState([])
    const [cardPull, setCardPull] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
            setCardPull(data.cards)
        }
        fetchData()
    }, [deckId])

    if (!deck) {
        return <p>Loading...</p>
    }

    const handleDeleteCard = async (cardId) => {
        const confirmDelete = window.confirm(
            "Delete this card?\n\nYou will not be able to recover it."
        )
        if (confirmDelete) {
            await deleteCard(cardId)
            // I need a function here that reloads the cards again, but there's no pre-made ListCards function like there is with ListDecks.
            const updatedDeck = {...deck}
            updatedDeck.cards = updatedDeck.cards.filter((c) => c.id !== cardId)
            setDeck(updatedDeck) 
        }
    }


    return (
        <>
            <ViewNavBar deck={deck} />
            <br />
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}>
                <button>Edit</button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
                <button>Study</button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
                <button>Add Cards</button>
            </Link>
            <br />
            <br />
            <h2>Cards</h2>
            <CardList deck={deck} handleDeleteCard={handleDeleteCard} />
        </>
    )
    //<p>Deck. This should render CardList, I think.</p>
}

export default Deck;