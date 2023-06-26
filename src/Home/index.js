import React from "react"
import { Link } from "react-router-dom"
import DeckList from "../Deck/List";

/*
BASICALLY:
1. "Create Deck" button.
The following is redered from the "/Deck/List" folder:
2. A list of all the decks, represented by cards. 
3. Each card has the buttons described below. (STUDY, VIEW, and DELETE)
*/

function Home() {
    return (
    <>
    {/*<Link to="/decks/new" className="btn-link-text">
        <button>Create Deck</button>
    </Link>
    <br />
    <br />*/}
    <DeckList />
    {/*I need cards to display the decks here. Each one needs the deck
    name, number of cards, and a STUDY, VIEW, and DELETE button.
    - The number of cards should be dynamic.
    - Clicking STUDY button takes you to STUDY screen. (/decks/:deckId/study)
    - Clicking VIEW button takes you to the DECK screen. (/decks/:deckId)
    - Clicking DELETE shows a delete message before deleting the deck
    
    - I need a DELETE prompt in this folder. 
    -- window.confirm() is somehow involved in creating this dialogue
    box.
    -- It happens when you click the DELETE button. 
    
    -- I need to render List here. */}

    </>
    )
}

export default Home