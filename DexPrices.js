const { parse } = require('dotenv');
const ethers = require('ethers');
const { hexValue, isHexString } = require('ethers/lib/utils');
const dotenv = require('dotenv').config();
const traderJoeABI = require('./TraderJoeABI.json')

async function main(){

    const avaxProvider = new ethers.providers.JsonRpcProvider(process.env.AVAX_RPC_URL);
    const signer = avaxProvider.getSigner();

    const block = await avaxProvider.getBlockNumber();

    //create contract objects for exchanges
    const traderJoeContract = new ethers.Contract(process.env.JOE_ROUTER_ADDRESS, traderJoeABI.abi, avaxProvider);

    console.log(block);

    //query exchanges for min out of stable coin for a token
    const tokenInAmount  = 1;
    const tokenPath = [process.env.CROWN_TOKEN_ADDRESS,process.env.MIM_TOKEN_ADDRESS];

    const price = await traderJoeContract.getAmountsOut(tokenInAmount, tokenPath);

    //calculate slippage 

    //check if there is meaningful price discrepancy between exhchanges with slippage

    //?? call flash loan contract that would execute exhange and exectution of arbitrage

    console.log(parseInt(price[1]['_hex'], 16));
}


main();
