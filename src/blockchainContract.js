import contractABI from "./abi.json"
import { BrowserProvider, Contract } from "ethers"

const contractAddress = "0x67e762858a7fb128cf133f5e5007f359ea1ade00"

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
