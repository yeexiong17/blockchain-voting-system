import Web3 from 'web3'
import contractABI from "./abi.json"

const contractAddress = "0x82d2f29Bd493219522823be07Db6aE4818f10741"

let web3 = new Web3(window.ethereum)
export const contract = new web3.eth.Contract(contractABI, contractAddress)
