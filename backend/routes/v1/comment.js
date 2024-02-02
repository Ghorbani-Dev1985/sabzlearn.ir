const express = require("express");

const commentController = require("../../controllers/v1/comment");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, commentController.create);
//   .get(commentController.getAll);

// router
//   .route("/:id/sessions")
//   .post(isAdminMiddleware, commentController.createSession);

// router.route("/:shortName").post(commentController.getOne);

// router.route("/:id/register").post(commentController.register);

module.exports = router;
