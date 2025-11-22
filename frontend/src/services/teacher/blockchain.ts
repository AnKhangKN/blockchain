import { ethers } from "ethers";
import ScoreManagerABI from "@/blockchain/artifacts/contracts/ScoreManager.sol/ScoreManager.json";

const CONTRACT_ADDRESS = "0xeC17805481f37fAe9c8880Becc989D2e3d6C0ae8";

let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;
let contract: ethers.Contract;

export async function initBlockchain() {
  if (!window.ethereum) throw new Error("Cài MetaMask trước!");

  // ethers v5
  provider = new ethers.providers.Web3Provider(window.ethereum as any);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ScoreManagerABI.abi, signer);
}

export async function addScore(
  studentAddress: string,
  subjectId: string,
  score: number
) {
  if (!contract) await initBlockchain();

  const tx = await contract.setScore(studentAddress, subjectId, score);
  await tx.wait();
  return tx.hash;
}
