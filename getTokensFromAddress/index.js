const abi = [
  {"constant": true,"inputs": [{"name": "owner", "type": "address"}],"name": "balanceOf","outputs": [{"name": "", "type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},
  {"constant": true,"inputs": [{"name": "owner", "type": "address"}, {"name": "index", "type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"name": "", "type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},
  {"constant": true,"inputs": [{"name": "tokenId", "type": "uint256"}],"name": "tokenURI","outputs": [{"name": "", "type": "string"}],"payable": false,"stateMutability": "view","type": "function"},
]

const { ethers } = require("ethers");
const axios = require('axios');

const main = async (event) => {
//exports.handler = async (event, context, callback) => {
    console.log(process.env.INFURA_KEY);

    const uri = event.uri;
    const contractAddress = event.contractAddress
    const address = event.address;

    const provider = new ethers.providers.JsonRpcProvider(uri);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const balance = await contract.balanceOf(address);
    console.log(balance);

    let datas = []
    //TODO 9個ずつ区切る

    for (var i = 0; i < balance; i++) {
        let tokenId = await contract.tokenOfOwnerByIndex(address, i);
        console.log(tokenId);
        let uri = await contract.tokenURI(tokenId);
        console.log(uri);
        //let metadata = await axios.get('https://qiita.com/api/v2/users/yamapyblack');
        //
        let metadata = await axios.get(
            'https://cryptospells.jp/metadata/card/110900506.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        //console.log(metadata.data);
        datas.push(metadata.data);
    }
    console.log(datas);


};

const event = {
  "contractAddress": "0x67cbbb366a51fff9ad869d027e496ba49f5f6d55",
  "uri": "https://mainnet.infura.io/v3/bd698dd9f9d540758ae606a9cefa6a5e",
  //"address": "0x12fA9a179f1db2a97052CcbFD7a4AAAA91Fef780"
  "address": "0xCDF4f278c469Fd3961707D6b4D54B8f244eA5d9E"
}

main(event)
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
