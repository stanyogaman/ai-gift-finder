export type EnvConfig = {
  googleClientId: string;
  googleClientSecret: string;
  openAiApiKey: string;
  geminiApiKey: string;
  googleSearchApiKey: string;
  googleSearchEngineId: string;
  databaseUrl: string;
  nextAuthSecret: string;
  webhookSigningSecret: string;
};

export const requiredEnvKeys: (keyof EnvConfig)[] = [
  'googleClientId',
  'googleClientSecret',
  'openAiApiKey',
  'geminiApiKey',
  'googleSearchApiKey',
  'googleSearchEngineId',
  'databaseUrl',
  'nextAuthSecret',
  'webhookSigningSecret'
];

export const loadEnv = (): EnvConfig => {
  const env = Object.fromEntries(
    requiredEnvKeys.map((key) => {
      const envKey = key
        .replace(/[A-Z]/g, (char) => `_${char}`)
        .toUpperCase();
      return [key, process.env[envKey]];
    })
  ) as Partial<EnvConfig>;

  const missing = requiredEnvKeys.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  return env as EnvConfig;
};
