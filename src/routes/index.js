const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./user");
const {TodoRouter} = require("./todos");
const {MemberRouter} = require("./members");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", UserRouter);
AppRouter.use("/todos", TodoRouter);
AppRouter.use("/members", MemberRouter);

module.exports = { AppRouter };