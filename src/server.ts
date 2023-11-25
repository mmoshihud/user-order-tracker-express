import app from "./app";
import config from "./config/development";
import mongoose from "mongoose";

main().catch((err) => {
  console.log(err);
});

async function main(): Promise<void> {
  await mongoose.connect(config.DATABASE_URL as string);

  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`);
  });
}
