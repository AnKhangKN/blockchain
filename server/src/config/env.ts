import dotenv from "dotenv";
import path from "path";

// Load .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Kiểu dữ liệu cho config
interface Config {
  PORT: number;
  MONGO_URI: string;
  FRONT_END_ORIGIN: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

// Lấy biến môi trường và kiểm tra
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// Xuất config
const config: Config = {
  PORT: Number(process.env.PORT) || 8000,
  MONGO_URI: getEnvVar("MONGO_URI"),
  FRONT_END_ORIGIN: getEnvVar("FRONT_END_ORIGIN"),
  JWT_ACCESS_SECRET: getEnvVar("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnvVar("JWT_REFRESH_SECRET"),
};

export default config;
