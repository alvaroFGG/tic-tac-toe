import S from "@/settings";
import mongoose from "mongoose";

const MONGODB_URI = S.DB_URI;

export default class DatabaseProvider {
  public static async connect() {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
