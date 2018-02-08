const path = require('path');
const { NodeClient, WalletClient } = require('bclient');

const config = require(path.resolve(__dirname, '../configs/bcoin.config.json'));
const { network, port, apiKey, host, walletPort } = config;
const configs = {
  apiKey,
  network,
  host,
  port: typeof port === 'number' ? port : parseInt(port)
};

if (port === '443' || config.uri.indexOf('https') > -1) configs.ssl = true;

const nodeClient = new NodeClient(configs);
let walletClient;
if (walletPort) {
  walletClient = new WalletClient({
    ...configs,
    port: typeof walletPort === 'number' ? walletPort : parseInt(walletPort)
  });
}

module.exports = { nodeClient, walletClient };
