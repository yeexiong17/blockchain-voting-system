import contractABI from "./abi.json";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0xf5335449301bfbba4e62966ef78067f95182c10a";

let provider;
let signer;
let contractInstance;

export const initialization = async () => {
    if (!contractInstance) {
        provider = new BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contractInstance = new Contract(contractAddress, contractABI, signer);
    }
    return contractInstance;
};

export const contract = () => {
    if (!contractInstance) {
        throw new Error("Contract is not initialized yet. Call `initialization()` first.");
    }
    return contractInstance;
};
