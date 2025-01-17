import Web3 from 'web3'
import contractABI from "./abi.json"

const contractAddress = "0xb7e952b075fa4e2f525502fd01b8cce3c4e7560e"

let web3 = new Web3(window.ethereum)
export const contract = new web3.eth.Contract(contractABI, contractAddress)
