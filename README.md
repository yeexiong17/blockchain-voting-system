# Blockchain Voting System

A decentralized voting system built with React and Ethereum smart contracts.

## Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Modern web browser (Chrome, Firefox, etc.)

## Installation

1. Clone the repository (git clone https://github.com/yeexiong17/blockchain-voting-system.git)
2. Install dependencies (npm install)
3. Start the development server (npm start)


The application will be available at `http://localhost:3000`

## Smart Contract Configuration

After deploying a new smart contract, you need to update the contract configuration:

1. Navigate to `src/blockchainContract.js`
2. Update the contract address:
3. Update the ABI:
   - After deploying your new contract, copy the new ABI
   - Navigate to `src/abi.json`
   - Replace the entire content with your new contract's ABI

**Note**: Make sure the contract address and ABI match your deployed contract, or the application won't be able to interact with the blockchain.

## User Guide

### For Administrators

#### Initial Setup
1. Log in with admin credentials (admin1@gmail.com, asdflkjh)
2. Navigate to "Vote Setting" page
3. Set up the voting period:
   - Select an end date and time for the voting period
   - Click "Set End Time" to confirm
4. Add candidates:
   - Go to "Manage Candidate" page
   - Enter candidate name
   - Click "Add Candidate" button
   - Add at least 2 candidates before starting the vote
5. Start the vote:
   - Return to "Vote Setting" page
   - Click "Start Vote" button

#### Monitor Voting
- View real-time voting results in the "Admin Dashboard"
- Monitor voting activities in "View Logs"

### For Voters

#### Registration Process
1. Create an account or log in
2. Navigate to "Voter Registration"
3. Complete the registration steps:
   - **Step 1**: Connect MetaMask wallet
     - Click "Connect Wallet" button
     - Approve the MetaMask connection
   - **Step 2**: Enter identification number
     - Format: YYMMDD-PB-XXXX (e.g., 900101-14-5566)
   - **Step 3**: Review and confirm registration details
     - Click "Complete Register" to finish registration

#### Voting Process
1. Go to the "Vote" page
2. Wait for voting period to start (if not already started)
3. When voting is active:
   - Select your preferred candidate
   - Click "Confirm" to cast your vote
4. View your voting status:
   - "Thank you for voting!" message appears after successful vote
   - View results in the "Result" page

## Important Notes

- Make sure MetaMask is installed and connected to the correct network
- Keep your wallet address and identification number secure
- Each voter can only vote once
- Votes cannot be changed after submission
- Voting results are visible to all users
- The voting period cannot be extended once started

## States of Voting

- **Preparation**: Initial state where admin sets up the vote
- **Ongoing**: Active voting period where users can cast votes
- **Ended**: Voting period has concluded, results are final

## Error Handling

- If you encounter MetaMask connection issues:
  1. Ensure MetaMask is installed
  2. Check if you're connected to the correct network
  3. Try refreshing the page
  4. Make sure you have sufficient funds for gas fees

- For registration issues:
  1. Verify your identification number format
  2. Ensure you're using a unique wallet address
  3. Check if you've already registered