module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  resetMocks: true,
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
};
