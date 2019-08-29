const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  coverageReporters: [
    "json", "lcov", "text", "html"
  ],
  setupFiles: [
    './polyfill.ts',
  ],
  transform: {
    ...tsjPreset.transform,
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    },
  },
}
