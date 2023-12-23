const router = require("express").Router();
const controller = require("./decks.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/:deckId").get(controller.read).all(methodNotAllowed);

module.exports = router;
