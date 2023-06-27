import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import Home from "../Home"
import CreateDeck from "../Deck/Create";
import Deck from "../Deck/View";
import Study from "../Deck/Study";
import EditDeck from "../Deck/Edit";
import AddCard from "../Card/Create";
import EditCard from "../Card/Edit";






function Layout() {
const { url, path } = useRouteMatch()

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
       
          
        
        {/*<div className="card">
          <div className="card-body">
            {/*how do I show my existing decks? 
            I was thinking of just creating a card that looks 
            like the example, but I don't know how to add 
            the number of cards that are in the deck. 
            It feels like maybe I have to access the data 
            in db.jason in the data folder? But I don't know how.  */}
          {/*</div>
        </div>
        
        ALL THE ROUTES SHOULD BE HERE, I think.
        Maybe this is like a map of the whole site. */}
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch> 
      </div>
    </>
  );
}

export default Layout;
