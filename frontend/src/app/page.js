"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Header from "./components/Header";
import {
  MainPageWrapper,
  MainH1Title,
  ParaBig,
  StyledButton,
  TextWrapper,
  ImageContainer,
  ImageStyle,
  Center,
  LeftSide,
  RightSide,
  Container,
  Box,
} from "@/app/styles/styles.js";

export default function Home() {
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
        </LeftSide>
        <RightSide>
          <Box>
            <Image
              src="/assets/nfts/1.jpg"
              alt="NFT"
              style={ImageStyle}
              width={0}
              height={0}
              layout="responsive"
            />
          </Box>
        </RightSide>
      </Container>
    </React.Fragment>
  );
}
