import { ethers } from "ethers";
import fs from "fs";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { ConnectKitButton } from "connectkit";

import { Price, Id } from "@/app/components/getterFuntions";

import { StyledButton, StyledConnectButton } from "@/app/styles/styles.js";

const jsonFilePath = "../KingKat.json";
const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
const contractData = JSON.parse(jsonData);
const contractAddress = contractData.address;
const contractABI = contractData.abi;

const { isConnected } = useAccount();

export default function Mint({ quantity }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "mint",
    args: [Id, quantity],
    value: (Price * quantity).toString(),
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <React.Fragment>
      {isConnected ? (
        <StyledButton disabled={!write || isLoading} onClick={write}>
          {isLoading ? "Minting..." : "Mint Now"}
        </StyledButton>
      ) : (
        <ConnectKitButton.Custom>
          {({ show }) => {
            return (
              <StyledConnectButton onClick={show}>
                {isLoading ? "Minting..." : "Mint Now"}
              </StyledConnectButton>
            );
          }}
        </ConnectKitButton.Custom>
      )}
    </React.Fragment>
  );
}
