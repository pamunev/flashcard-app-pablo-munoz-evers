import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "../Home";
import CreateDeck from "../Deck/Create";
import Deck from "../Deck/View";
import Study from "../Deck/Study";
import EditDeck from "../Deck/Edit";
import AddCard from "../Card/AddCard/AddCard.js";
import EditCard from "../Card/Edit";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
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
