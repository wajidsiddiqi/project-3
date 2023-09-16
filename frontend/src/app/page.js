"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EnlargeImage from "./components/EnlargeImage";
import { TotalSupply } from "./components/getterFuntions";
import Mint from "./components/Mint";
import {
  MainPageWrapper,
  MainH1Title,
  ParaBig,
  ParaMid,
  ParaSm,
  StyledButton,
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
  QuantityBox,
  BoxContainer_2,
} from "@/app/styles/styles.js";

export default function Home() {
  const [mintQuantity, setMintQuantity] = useState(1);
  const [totalSupply, setTotalSupply] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDecrement = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  const handleIncrement = () => {
    if (mintQuantity >= 15) return;
    setMintQuantity(mintQuantity + 1);
  };

  useEffect(() => {
    // Fetch the total supply when the component mounts
    TotalSupply()
      .then((result) => {
        setTotalSupply(result);
      })
      .catch((error) => {
        console.error("Error fetching total supply:", error);
      });
  }, []); // Empty dependency array to run once on mount*/

  return (
    <MainPageWrapper>
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
            <ImageContainer onClick={() => setIsOpen(true)}>
              <img src="/assets/nfts/1.jpg" alt="NFT" style={ImageStyle} />
            </ImageContainer>
            <EnlargeImage isOpen={isOpen} setIsOpen={setIsOpen} />
            <BoxContainer>
              <ChildContainer style={{ alignItems: "flex-start" }}>
                <Center>
                  <ParaSm>Total Minted</ParaSm>
                </Center>
                <Center>
                  <ParaMid>
                    {totalSupply !== null
                      ? `${totalSupply} / 15`
                      : "Loading... / 15"}
                  </ParaMid>
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
                    <ParaMid>0.01</ParaMid>
                  </Center>
                </Center>
              </ChildContainer>
            </BoxContainer>

            <BoxContainer_2>
              <ChildContainer style={{ alignItems: "flex-start" }}>
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
                  <QuantityBox>{mintQuantity}</QuantityBox>
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

              <ChildContainer style={{ alignItems: "flex-end" }}>
                <Center>
                  <Mint quantity={mintQuantity} />
                </Center>
              </ChildContainer>
            </BoxContainer_2>
          </Box>
        </RightSide>
      </Container>
      <Footer />
    </MainPageWrapper>
  );
}
