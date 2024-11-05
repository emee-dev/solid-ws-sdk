import { defineConfig } from '@solidjs/start/config';

const app = defineConfig({
  server: {
    experimental: {
      websocket: true,
    },
  },
});

const ws = app.addRouter({
  name: 'ws',
  type: 'http',
  handler: './src/ws.ts',
  target: 'server',
  base: '/ws',
});

export default ws;
