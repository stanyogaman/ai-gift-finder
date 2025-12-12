import { createServer } from 'http';
import { app } from './app';
import { loadEnv } from '@awseen/config';

const PORT = Number(process.env.PORT ?? 4000);

try {
  loadEnv();
} catch (error) {
  console.warn('Environment validation failed:', (error as Error).message);
}

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`AWSEEN backend listening on port ${PORT}`);
});
