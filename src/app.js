const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//const userRoutes = require("./routes/userRoutes");
const frontPageRoute = require("./routes/FrontPageRoute")
const loginPageRoute = require("./routes/LoginPageRoute")
const registerPageRoute = require("./routes/RegisterPageRoute")
const battlePageRoute = require("./routes/BattlePageRoute")
const pokemonRoute = require("./routes/PokemonRoute");
const pocketRoute = require("./routes/PocketRoute");
const infoRoute = require("./routes/InfoRoute");
const typeRoute = require("./routes/TypeRoute");
const evoRoute = require("./routes/EvoRoute");
const statRoute = require("./routes/StatRoute");
const moveRoute = require("./routes/MoveRoute");
const battleRoute = require("./routes/BattleRoute");

const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('views'));

//app.use("/users", userRoutes);
app.use("/", frontPageRoute);
app.use("/login", loginPageRoute);
app.use("/register", registerPageRoute);
app.use("/battle", battlePageRoute);
app.use("/pokemon", pokemonRoute);
app.use("/pocket", pocketRoute);
app.use("/info", infoRoute);
app.use("/type", typeRoute);
app.use("/evo", evoRoute);
app.use("/stat", statRoute);
app.use("/move", moveRoute);
app.use("/battle", battleRoute);

app.use(errorMiddleware);

module.exports = app;