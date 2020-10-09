import log from 'fancy-log';
import config from 'config';

import App from './app';

const { port: sPort, env } = config.get('general');

class Server {
  server: any;

  express: App;

  constructor() {
    this.express = new App();

    const serverPort = parseInt(env === 'test' ? 8378 : sPort, 10) || 80;

    this.server = this.express.app.listen(serverPort, async () => {
      log(`Server running on http://localhost:${serverPort} `);
    });
  }
}

export default new Server();
