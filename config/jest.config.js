const { defaults } = require('jest-config');


module.exports = {
  bail: true,
  rootDir: '../',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(scss|less)$': 'identity-obj-proxy',
    '^ducks(.*)': '<rootDir>/src/state/ducks$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
    setupFiles: ['./config/enzyme.setup.js'],
};
  