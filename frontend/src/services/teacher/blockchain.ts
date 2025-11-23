// blockchain.ts
import { ethers } from "ethers";
import ScoreManagerABI from "@/blockchain/artifacts/contracts/ScoreManager.sol/ScoreManager.json";

const CONTRACT_ADDRESS = "0xD90557342fA669F55f84de88Ff9b6D4a14643838";

// Biến toàn cục
let provider: ethers.providers.JsonRpcProvider | null = null;
let contract: ethers.Contract | null = null;

// Khởi tạo blockchain (chỉ init 1 lần)
export function initBlockchain() {
  if (contract) return; // đã init rồi
  // Dùng provider mặc định (public RPC) để chỉ đọc
  provider = new ethers.providers.JsonRpcProvider("https://coston-api.flare.network/ext/C/rpc"); // đổi thành testnet RPC của bạn
  contract = new ethers.Contract(CONTRACT_ADDRESS, ScoreManagerABI.abi, provider);
  console.log("Blockchain initialized (read-only)");
}

// Thêm hoặc cập nhật điểm (chỉ owner mới gọi được)
export async function addScore(studentId: string, subjectId: string, score: number, signer?: ethers.Signer) {
  if (!signer) throw new Error("Signer is required to write score");
  const writeContract = new ethers.Contract(CONTRACT_ADDRESS, ScoreManagerABI.abi, signer);
  const tx = await writeContract.setScore(studentId, subjectId, score);
  await tx.wait();
  return tx.hash;
}

// Lấy điểm an toàn cho sinh viên
export async function getAllScoresSafe(studentId: string) {
  if (!contract) initBlockchain();
  if (!contract) return [];

  try {
    // Gọi getAllScores
    const [subjectIds, studentIds, values] = await contract.getAllScores(studentId);

    // Chuyển về dạng array dễ dùng
    const scores: { studentId: string; subjectId: string; value: number }[] = [];
    for (let i = 0; i < subjectIds.length; i++) {
      scores.push({
        studentId: studentIds[i],
        subjectId: subjectIds[i],
        value: Number(values[i]),
      });
    }
    return scores;
  } catch (err) {
    console.warn("Không có điểm hoặc chưa có quyền:", err);
    return []; // luôn trả về mảng, không bị crash
  }
}

// Lấy điểm 1 môn
export async function getScore(studentId: string, subjectId: string) {
  if (!contract) initBlockchain();
  if (!contract) return null;

  try {
    const score = await contract.getScore(studentId, subjectId);
    return {
      studentId: score.studentId,
      subjectId: score.subjectId,
      value: Number(score.value),
    };
  } catch (err) {
    console.warn("Chưa có điểm môn này:", err);
    return null;
  }
}
