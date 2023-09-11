"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Footer from "./components/Footer";
// import ScrollToTopButton from "./components/ScrollToTopButton";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import {
  MainPageWrapper,
  MainH1Title,
  ParaBig,
  ParaMid,
  ParaSm,
  StyledButton,
  TextWrapper,
  ImageContainer,
  ImageStyle,
  Center,
  LeftSide,
  RightSide,
  Container,
  Box,
  ChildContainer,
  BoxContainer,
  Icon,
  Input,
} from "@/app/styles/styles.js";

export default function Home() {
  const [mintQuantity, setMintQuantity] = useState(1);

  const handleDecrement = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  const handleIncrement = () => {
    if (mintQuantity >= 15) return;
    setMintQuantity(mintQuantity + 1);
  };

  return (
    <React.Fragment>
      <Header />
      <Container>
        <LeftSide>
          <MainH1Title>King Kat</MainH1Title>
          <ParaBig>
            Lorem ipsum dolor sit amet. Qui pariatur illo et inventore dolor ut
            facere voluptas non tempora praesentium quo dignissimos laborum qui
            consequatur aliquam! Et ullam alias et similique sunt ad distinctio
            repudiandae ut veniam atque cum odio nostrum qui soluta dicta. Est
            culpa eligendi ut voluptas molestiae et natus mollitia ex fugiat
            dolore eum magni necessitatibus.
          </ParaBig>
          <Link href="https://sepolia.etherscan.io/address/0xf9532EaFB5Cf0B97922E10647f9a9b3E79089efd">
            <StyledButton>View on Etherscan</StyledButton>
          </Link>
        </LeftSide>
        <RightSide>
          <Box>
            <Image
              src="/assets/nfts/1.jpg"
              alt="NFT"
              style={ImageStyle}
              width="350"
              height="350"
            />
            <BoxContainer>
              <ChildContainer style={{ alignItems: "flex-start" }}>
                <Center>
                  <ParaSm>Total Minted</ParaSm>
                </Center>
                <Center>
                  <ParaMid>0 / 15</ParaMid>
                </Center>
              </ChildContainer>

              <ChildContainer style={{ alignItems: "flex-end" }}>
                <Center>
                  <ParaSm>Price</ParaSm>
                </Center>
                <Center style={{ gap: "0.1rem" }}>
                  <Icon>
                    <Image
                      src="/assets/icons/ethereum.svg"
                      width="18"
                      height="18"
                      alt="ETH"
                    />
                  </Icon>
                  <Center>
                    <ParaMid>100</ParaMid>
                  </Center>
                </Center>
              </ChildContainer>
            </BoxContainer>

            <BoxContainer>
              <ChildContainer style={{ alignItems: "flex-start" }}>
                <Center>
                  <StyledButton>Mint Now</StyledButton>
                </Center>
              </ChildContainer>

              <ChildContainer style={{ alignItems: "flex-end" }}>
                <Center>
                  <StyledButton
                    style={{
                      borderTopRightRadius: "0rem",
                      borderBottomRightRadius: "0rem",
                    }}
                    onClick={handleDecrement}
                  >
                    -
                  </StyledButton>
                  <Input value={mintQuantity}></Input>
                  <StyledButton
                    style={{
                      borderTopLeftRadius: "0rem",
                      borderBottomLeftRadius: "0rem",
                    }}
                    onClick={handleIncrement}
                  >
                    +
                  </StyledButton>
                </Center>
              </ChildContainer>
            </BoxContainer>
          </Box>
        </RightSide>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
