import app from "./app";
import connectDB from "./config/db"; // db.ts đã export default
import config from "./config/env"; // config.ts đã export default

// Gọi hàm kết nối MongoDB
connectDB().then(() => {
  app.listen(config.PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
}).catch((error: unknown) => {
  if (error instanceof Error) {
    console.error("Failed to connect to DB:", error.message);
  } else {
    console.error("Failed to connect to DB:", error);
  }
  process.exit(1);
});
