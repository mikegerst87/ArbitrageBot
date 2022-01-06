const ethers = require('ethers');
const joeFactoryAbi = require('./JoeFactory.json');
const dotenv = require('dotenv').config();


async function getPairs(){
    const avaxProvider = new ethers.providers.JsonRpcProvider(process.env.AVAX_RPC_URL);


    const joeFactory = new ethers.Contract(joeFactoryAbi.address, joeFactoryAbi.abi, avaxProvider);
    console.log(joeFactory)
    

    const numberOfTradablePairs = await joeFactory.allPairsLength();


    for(let i = 0; i < numberOfTradablePairs; i++){
        const pair = await joeFactory.allPairs(i);
        console.log(pair);
    }

    //const networkWorking = await avaxProvider.detectNetwork();

    console.log(tradablePairs);
    
}

getPairs();
