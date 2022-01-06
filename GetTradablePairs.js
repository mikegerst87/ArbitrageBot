const ethers = require('ethers');
const joeFactoryAbi = require('./JoeFactory.json');
const pangolinFactoryAbi = require('./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/PangolinFactory.sol/PangolinFactory.json')
const dotenv = require('dotenv').config();
const {getPriceForToken} = require('./DexPrices.js')


async function getPairs(){
    const avaxProvider = new ethers.providers.JsonRpcProvider(process.env.AVAX_RPC_URL);


    const joeFactory = new ethers.Contract(joeFactoryAbi.address, joeFactoryAbi.abi, avaxProvider);
    const pangolinFactory = new ethers.Contract(process.env.PANGOLIN_FACTORY_ADDRESS,pangolinFactoryAbi.abi, avaxProvider);
   

    async function FindAllTokensTradableOnPangolin(){
        let pangolinTokens = {
            tokens: [
            ]
        }
        const tokens = tokenList.tokens;
        for(let i = 0; i < tokens.length; i++){
            const tokenAddress = tokens[i].address;
            const tokenDec = tokens[i].decimals;
            console.log(tokens[i].symbol)
            try{
                await getPriceForToken(tokenAddress, wavaxAddress, 18);
                pangolinTokens.tokens.push(tokens[i]);
            }
            catch(error){
                console.log(error);
                
            }
            
        }
    
        fs.writeFile('./PangolinTokens.json',JSON.stringify(pangolinTokens), err =>{});
        
    }

    //const networkWorking = await avaxProvider.detectNetwork();

    console.log(`JOE TOTAL PAIRS: ${numberOfTradablePairsJoe} PANGOLIN TOTAL PAIRS: ${numberOfTradablePairsPangolin}`);
    
}

getPairs();
