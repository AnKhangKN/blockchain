const app = require("./src/app");
const connectDB = require("./src/config/db");
const { PORT } = require("./src/config/env");

// Gọi hàm kết nối MongoDB
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
