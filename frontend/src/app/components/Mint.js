"use client";
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
  ErrorContainer,
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

      {(isPrepareError || isError) && (
        <Modal onClick={() => setIsErrorSeen(false)} isErrorSeen={isErrorSeen}>
          <ErrorContainer isErrorSeen={isErrorSeen}>
            {(prepareError || error)?.message}
          </ErrorContainer>
        </Modal>
      )}
    </React.Fragment>
  );
}
