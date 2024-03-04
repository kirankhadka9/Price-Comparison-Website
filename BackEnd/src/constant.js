import { config } from "dotenv";

config();
export let port = process.env.PORT;
export let email = process.env.EMAIL;
export let password = process.env.PASSWORD;
export let secretKey = process.env.SECRET_KEY;
export let serverLink = process.env.SERVER_LINK;
export let databaseLink = process.env.DATABASE_LINK;