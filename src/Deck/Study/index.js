// use the readDeck() function to load the deck that's being studied. 
/*---(you just plug in the deckId as a parameter. Optionally an abort signal too.)
it returns the saved deck.*/
/* - build a breadcrumb navigation bar. It should have a link to Home
(/) followed by the name of the deck being studied, and finally the word
"Study".  
-- figure out how to make a breadcrumb navigation bar.
- The deck title ((i.e., "Study: Rendering in React" )) is shown on the screen. 
- Cards are shown one at a time, front side first. 
- A button at the bottom "flips" the card (links to a different screen? 
    oh. "front" and "back" are keys in each ard object.
    so clicking FLIP links to a page with the "back" or "front", depending. 
    And the "back" also has a "next" button. )
- After flipping, a "next" button appears to take you to the next card. 
- After the last card, a message is shown to restart the deck.
-- as in, if the card's index minus 1 === cards.length, then there is a 
restart message that appears.  
    -- If you don't restart the deck, you go back to HOME screen. 
    You can use window.confirm() for this text box. 
    Like, click "cancel" to go to the Home page. 
    The question is, Restart cards?

- If you study a deck with 2 or fewer cards, a Not Enough Cards message
should show. if cards.length < 3.
-- And also a button to add more cards to the deck. 
-- Maybe we start it with this page. Like, this is the IF, and the ELSE is the 
normal card view. 

- The NEXT button appears after a card is flipped. 

- PATH: /decks/:deckId/study


BASICALLY:
1. Breadcrumb navigation bar.
2. Deck title. 
3. Card front. (Has buttons.) (Or too few cards page.)


*/

import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { readDeck, readCard } from "../../utils/api"
import StudyNavBar from "./StudyNavBar"


function Study() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)
    const [cardId, setCardId] = useState(1)
    const [card, setCard] = useState(null)
    const [isFront, setIsFront] = useState(true)
    const history = useHistory()

    useEffect(() => {
        /*readDeck(deckId)
        .then((data) => setDeck(data))
        .catch((error) => {
            console.log(error)
        })*/
        const fetchData = async () => {
            try {
                const data = await readDeck(deckId)
                setDeck(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [deckId])

    /*useEffect(() => {
        readDeck(deckId).then(setDeck);
      }, [deckId]);*/

    /* How do I make the page display the first card in the deck? 
    I map them? And then create a separate component CurrentCard.
    No, because I want to show them one at a time. Not all in a list.
    So I want card with card.id === 1 to show up first. Then the buttons will be links to the rest. 
    
    Maybe I make card.id === 1 be the one the shows up. 
    
    A click handler on "next" that would setCardId(cardId + 1)*/

    useEffect(() => {
        /*readCard(cardId)
        .then((data) => setCard(data))
        .catch((error) => {
            console.log(error)
        })*/
        const fetchData = async () => {
            try {
                const data = await readCard(cardId)
                setCard(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [cardId])

    const handleFlip = () => {
        setIsFront(!isFront)
    }

    const handleNext = () => {
        if (cardId < deck.cards.length) {
            setCardId(cardId + 1)
            setIsFront(true)
        } else {
            const restartStudy = window.confirm(
                "Restart cards?\n\nClick 'cancel' to return to the home page."
            )
            if (restartStudy) {
                setCardId(1)
                setIsFront(true)
            } else {
                history.push("/")
            }
        }
    }

    /* Now I just need to figure out how to add the pop-up message after the final card */

    if (!deck || !card) {
        return <h2>Loading...</h2>
    }

    if (deck.cards.length < 3) {
        return (
            <>
                <br />
                <h3>Not enough cards.</h3>
                <br />
                <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                <br />
                <Link to={`/decks/${deckId}/cards/new`}>
                <button>Add Cards</button>
                </Link>
            </>
        )
    }

    return (
    <>
        <StudyNavBar />
        <br />
        <h2>Study: {deck.name}</h2>
        <br />
        <div className="card">
            <div className="card-header">
                {/* Card 1 of 3, for example. 
                So, I need to make something like, {card.id} of {deck.length}*/}
                <h3>Card {card.id} of {deck.cards.length}</h3>
            </div>
            <div className="card-body">
                {isFront ? (
                <div>
                    <p>{card.front}</p>
                    <br />
                    <button onClick={handleFlip}>Flip</button>
                </div>
                ) : (
                <div>
                    <p>{card.back}</p>
                    <br />
                     <button onClick={handleFlip}>Flip</button>
                    <button onClick={handleNext}>Next</button>
                </div>
                )          
                }
            </div>
                
        </div>
    </>
    )
}

export default Study;

