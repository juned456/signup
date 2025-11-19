// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle CSS imports (required for Next.js)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

module.exports = createJestConfig(config);
