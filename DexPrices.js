
const fs = require('fs');
const { parse } = require('dotenv');
const ethers = require('ethers');
const dotenv = require('dotenv').config();
const traderJoeABI = require('./TraderJoeABI.json')
const pangolinABI = require('./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-periphery/PangolinRouter.sol/PangolinRouter.json');
const { parseUnits, formatEther } = require('ethers/lib/utils');
const tokenList = require('./JoeTokenList.json');
const { captureRejections } = require('events');
const pangolinTokensJSON = require('./PangolinTokens.json');

const qiAddress = '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5';

const usdtAddress = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118';
const wavaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

const avaxProvider = new ethers.providers.JsonRpcProvider(process.env.AVAX_RPC_URL);
const signer = avaxProvider.getSigner();
const traderJoeContract = new ethers.Contract(process.env.JOE_ROUTER_ADDRESS, traderJoeABI.abi, avaxProvider);
const pangolinContract = new ethers.Contract(process.env.PANGOLIN_ROUTER_ADDRESS, pangolinABI.abi, avaxProvider);

async function main(){

    

    GetPricesForAllPangolinMatchedTokens();
    //query exchanges for min out of stable coin for a token
    
    //FindAllTokensTradableOnPangolin();

    //calculate slippage 

    //check if there is meaningful price discrepancy between exhchanges with slippage

    //?? call flash loan contract that would execute exhange and exectution of arbitrage

    console.log( formatEther(await avaxProvider.getGasPrice()));

    

    
}

async function GetPriceForToken(tokenIn, tokenOut, decimals){
    const tokenInAmount  = '1000000000000000000';

    const tokenPath = [tokenIn, tokenOut];

    const joePrice = await traderJoeContract.getAmountsOut(tokenInAmount, tokenPath);
    const pangolinPrice = await pangolinContract.getAmountsOut(tokenInAmount, tokenPath);
    
    const joePriceToNumber = ethers.utils.formatUnits(joePrice[1], decimals);
    const pangolinPriceToNumber = ethers.utils.formatUnits(pangolinPrice[1], decimals);

    console.log(`JOE PRICE: ${joePriceToNumber} PANGOLIN PRICE: ${pangolinPriceToNumber}`);

    return {
        joePriceToNumber,
        pangolinPriceToNumber
    }
}

async function GetPricesForAllPangolinMatchedTokens(){
    const tokens =pangolinTokensJSON.tokens;
    for(let i = 0; i < tokens.length; i++){
        const tokenAddress = tokens[i]['address'];
        const tokenDec = tokens[i]['decimals'];
        try{
            const prices = await GetPriceForToken(tokenAddress, process.env.MIM_TOKEN_ADDRESS, tokenDec);
        console.log(IsArbitrageOpportunity(prices), tokens[i]['symbol']);
        }catch(error){
            console.error(error);
        }
        
        
    }

}

function IsArbitrageOpportunity(prices){
    return (prices.joePriceToNumber != prices.pangolinPriceToNumber && (Math.max(prices.joePriceToNumber, prices.pangolinPriceToNumber)- Math.abs(prices.joePriceToNumber - prices.pangolinPriceToNumber))/100 > .01);
}





main();
