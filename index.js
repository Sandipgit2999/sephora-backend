const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const { connection } = require("./config/db");
const { UserController } = require("./routes/user.route");
const { MakeupController } = require("./routes/makeup.route");
const { CartController } = require("./routes/cart.route");
const { authorization } = require("./middlewares/Authorization");
const { FavouriteController } = require("./routes/favourite.route");
app.use("/user", UserController);
app.use("/makeup", MakeupController);
app.use("/cart", CartController);
app.get("/", (req, res) => {
  res.send({ msg: "welcome to sephora.com" });
});
app.use(authorization);

app.use("/favourite", FavouriteController);
const PORT = 8080 || process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connection successfully established");
    console.log(`running on port ${PORT}`);
  } catch (err) {
    console.log("connection failed to db");
    console.log(err);
  }
});
