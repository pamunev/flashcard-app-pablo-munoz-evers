const router = require("express").Router();
const controller = require("./decks.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/:id").get(controller.read).all(methodNotAllowed);

router.route("/:id/cards").get(controller.listCards).all(methodNotAllowed);

module.exports = router;
