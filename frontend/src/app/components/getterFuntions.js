import fs from "fs";
import { readContracts } from "wagmi";
import { ethers } from "ethers";

const jsonFilePath = "../KingKat.json";
const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
const contractData = JSON.parse(jsonData);
const contractAddress = contractData.address;
const contractABI = contractData.abi;

const getPrice = await readContracts({
  contracts: [
    {
      address: contractAddress,
      abi: contractABI,
      functionName: "getPrice",
    },
  ],
});

const getId = await readContracts({
  contracts: [
    {
      address: contractAddress,
      abi: contractABI,
      functionName: "getTokenAId",
    },
  ],
});

const Price = ethers.parseEther(getPrice).toString();
const Id = getId;

export { Price, Id };
