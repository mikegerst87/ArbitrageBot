const {ethers} = require('ethers');

const ethInWei = (10**18).toString();


const main = () =>{
    const eth  = ethers.utils.formatEther(ethers.BigNumber.from(ethInWei));
    const wei  = ethers.utils.formatUnits(ethers.BigNumber.from(ethInWei), 0);
    const weiNum  = ethers.utils.formatUnits(ethers.BigNumber.from(ethInWei), 18);
    console.log(eth, wei, weiNum);
}

main()