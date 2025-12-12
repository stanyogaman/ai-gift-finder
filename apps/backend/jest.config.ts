import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@awseen/(.*)$': '<rootDir>/../../packages/$1/src'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};

export default config;
