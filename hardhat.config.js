require("@nomiclabs/hardhat-waffle");

require('hardhat-graph')

const {task} = require('hardhat/config')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork:"localhost",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545"
    }
  },
  //subgraph初始化相关配置，'hhq/MySubgraph' 表示 前缀/项目名称
  subgraph: {
    name: 'hhq/MySubgraph', // Defaults to the name of the root folder of the hardhat project
    product: 'subgraph-studio', // Defaults to 'subgraph-studio'
    indexEvents: true|false, // Defaults to false
    allowSimpleName: true|false // Defaults to `false` if product is `hosted-service` and `true` if product is `subgraph-studio`
  },
  //subgraph 项目目录
  paths: {
    subgraph: './subgraph' // Defaults to './subgraph'

  },
  solidity: "0.8.4",
};
