import { readContracts } from "wagmi";
import { ethers } from "ethers";
import Contract from "../KingKat.json";

const TotalSupply = async () => {
  const getTotalSupply = await readContracts({
    contracts: [
      {
        address: Contract.address,
        abi: Contract.abi,
        functionName: "totalSupply",
        args: [1],
      },
    ],
  });

  if (getTotalSupply[0].status === "success") {
    return getTotalSupply[0].result.toString();
  } else {
    const error = getTotalSupply[0].error;
    console.error("Error:", error);
  }
};

export { TotalSupply };
