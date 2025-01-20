import contractABI from "./abi.json";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x15e701749e684fa08caf1679130f41041f46b435";

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
