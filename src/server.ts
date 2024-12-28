import sequelize from "./models";
import express from 'express';
import bodyParser from "body-parser";
import userRoutes from './routes/UserRoutes';
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  app
    .listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.error(`Server failed to start: ${err}`);
    });
});

export default app;
