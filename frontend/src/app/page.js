"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import "./styles/custom-font.css";
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
  bgImageStyle,
} from "@/app/styles/styles.js";

export default function Home() {
  return <Header />;
}
