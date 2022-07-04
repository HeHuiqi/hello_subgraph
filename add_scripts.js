const package = require("./package.json")
package.scripts = {
    "start": "npx hardhat node",
    "deploy": "npx hardhat run scripts/hqtoken-script.js",
    "test": "npx hardhat test --network hardhat",
    "graph-local-node-start": "cd ./docker && docker-compose up",
    "graph-local-node-stop": "cd ./docker &&  docker-compose down -v && docker-compose rm -v && rm -rf data/ipfs data/postgres",
    "graph-local-codegen": "cd ./subgraph && npm run codegen",
    "graph-local-build": "cd ./subgraph && npm run build",
    "create-local-subgraph-node": "cd ./subgraph &&  npm run create-local",
    "deploy-local-subgraph-node": "cd ./subgraph && npm run deploy-local",
    "remove-local-subgraph-node": "cd ./subgraph && npm run remove-local",
}
package.devDependencies = {
    "@graphprotocol/graph-cli": "^0.31.0",
    "@graphprotocol/graph-ts": "^0.27.0",
    "@nomiclabs/hardhat-ethers": "^2.0.6",
    "@nomiclabs/hardhat-waffle": "^2.0.3",
    "chai": "^4.3.6",
    "ethereum-waffle": "^3.4.4",
    "ethers": "^5.6.9",
    "hardhat": "^2.9.9",
    "hardhat-graph": "git+https://github.com/graphprotocol/hardhat-graph.git#main"
};
const fs = require("fs")
fs.writeFileSync("package.json",JSON.stringify(package));
console.log(package);