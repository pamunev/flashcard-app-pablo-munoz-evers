/*I think this should render all decks
DeckList
*/
/*I need cards to display the decks here. Each one needs the deck
    name, number of cards, and a STUDY, VIEW, and DELETE button.
    - The number of cards should be dynamic.
    - Clicking STUDY button takes you to STUDY screen. (/decks/:deckId/study)
    - Clicking VIEW button takes you to the DECK screen. (/decks/:deckId)
    - Clicking DELETE shows a delete message before deleting the deck
    
    - I need a DELETE prompt in this folder. 
    -- window.confirm() is somehow involved in creating this dialogue
    box.
    -- It happens when you click the DELETE button.*/

import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck, loadDecks } from "../../utils/api";
import { Link } from "react-router-dom";

function DeckList() {
    const [allDecks, setAllDecks] = useState([])
    //const [numCards, setNumCards] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const data = await listDecks()
            setAllDecks(data)
        }
        fetchData()
    }, [])

    const handleDelete = async (deck) => {
        const confirmDelete = window.confirm(
            "Delete this deck? You will not be able to recover it."
        )
        
        if (confirmDelete) {
            await deleteDeck(deck.id)
            loadDecks()
        }
    }

    function loadDecks() {
        listDecks().then(setAllDecks)
    }

    /* Now I map through allDecks. 
    And each deck will be a card that I design with HTML. */



    /*const decks = async () => {
        try {
            data
        }
    }*/


    return (
        <>
        {allDecks.map((deck) => {
            //{setNumCards(deck.cards.length)}
            return (
            <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h3 className="card-title">{deck.name}</h3>
                    <div>{deck.cards.length} cards</div>
                </div>
                <div className="card-body">
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn-link-text">
                        <button>View</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn-link-text">
                        <button>Study</button>
                    </Link>
                    <button onClick={handleDelete} className="float-right">Delete</button>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default DeckList;