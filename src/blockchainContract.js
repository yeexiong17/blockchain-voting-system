import contractABI from "./abi.json"
import { BrowserProvider, Contract } from "ethers"

const contractAddress = "0xb97b831a6bc03054cb2c20ff7811b87b87705423"

let provider
let signer
let contractInstance

export const initialization = async () => {
    try {
        if (!contractInstance) {
            provider = new BrowserProvider(window.ethereum)
            signer = await provider.getSigner()
            contractInstance = new Contract(contractAddress, contractABI, signer)
        }
        return contractInstance
    } catch (error) {
        if (error.code === 4001) {
            console.error("User rejected the request:", error.message)
            alert("You need to allow access to your wallet to use this application.")
        } else {
            console.error("An error occurred during initialization:", error)
        }
        throw error
    }
}

export const contract = () => {
    if (!contractInstance) {
        throw new Error("Contract is not initialized yet. Call `initialization()` first.")
    }
    return contractInstance
}
