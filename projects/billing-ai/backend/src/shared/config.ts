
import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  BACKEND_PORT: parseInt(process.env.BACKEND_PORT || "4000", 10),
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/fullstackdb",
  JWT_SECRET: process.env.JWT_SECRET || "dev_jwt_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "3600s",
  SHARE_TOKEN_SECRET: process.env.SHARE_TOKEN_SECRET || "dev_share_secret",
  SHARE_TOKEN_EXP_SECONDS: parseInt(process.env.SHARE_TOKEN_EXP_SECONDS || "1209600", 10)
};
