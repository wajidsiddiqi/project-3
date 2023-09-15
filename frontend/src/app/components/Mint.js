import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { ConnectKitButton } from "connectkit";

import {
  StyledButton,
  StyledConnectButton,
  Modal,
  ErrorMsg,
  ErrorContainer,
  CloseIcon,
} from "@/app/styles/styles.js";
import Contract from "../KingKat.json";

const price = ethers.parseEther("0.01");
const id = 1;

export default function Mint({ quantity }) {
  const { isConnected } = useAccount();
  const [isErrorSeen, setIsErrorSeen] = useState(false);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Contract.address,
    abi: Contract.abi,
    functionName: "mint",
    args: [id, quantity],
    value: BigInt(price.toString()) * BigInt(quantity),
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isPrepareError || isError) {
      setIsErrorSeen(true);
    }
  }, [isPrepareError, isError]);

  function handleError(error) {
    if (error) {
      const errorMsg = error?.message;
      if (errorMsg.includes("InsufficientFundsError")) {
        return "Insufficient funds to perform this operation.";
      } else {
        const errorLines = errorMsg.split("\n");
        let output = "";
        for (let i = 0; i < errorLines.length; i++) {
          if (errorLines[i].startsWith("Contract Call")) {
            break;
          }
          output += errorLines[i] + "\n";
        }
        return output;
      }
    } else {
      console.error(error);
      return "An error occurred while executing the contract function.";
    }
  }

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
              <StyledConnectButton onClick={show}>Mint Now</StyledConnectButton>
            );
          }}
        </ConnectKitButton.Custom>
      )}

      {(isPrepareError || isError) && isErrorSeen && (
        <Modal>
          <ErrorContainer>
            <ErrorMsg $isErrorSeen={isErrorSeen}>
              <CloseIcon onClick={() => setIsErrorSeen(false)}>X</CloseIcon>
              {handleError(prepareError || error)}
            </ErrorMsg>
          </ErrorContainer>
        </Modal>
      )}
    </React.Fragment>
  );
}
