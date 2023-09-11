"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import NextLink from "next/link";
import Hamburger from "hamburger-react";

import {
  CenterSpaceBetween,
  CenterSpaceAround,
  MaxWidth,
  StyledConnectButton,
  NavLinkForIcon,
  StyledNav,
  StyledButton,
  PageWrapperDark,
  HeaderBtn,
  NavBarContainer,
  LogoText,
} from "@/app/styles/styles.js";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 675);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledNav>
      <MaxWidth style={{ margin: "auto" }}>
        <CenterSpaceBetween>
          <NextLink href="/" style={{ textDecoration: "none" }}>
            <LogoText>KK</LogoText>
          </NextLink>
          <NavBarContainer>
            {/* Hamburger Menu */}
            {isMobile && isOpen && (
              <PageWrapperDark
                style={{
                  position: "fixed",
                  top: "0",
                  right: isOpen ? "0" : "300px",
                  height: "100vh",
                  width: "300px",
                  zIndex: "998",
                  transition: "right 0.3s ease-in-out",
                  padding: "0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CenterSpaceAround style={{ flexDirection: "column" }}>
                  <NavLinkForIcon>
                    <NextLink
                      href="http://opensea.com"
                      onClick={handleMenuClose}
                    >
                      <Image
                        src="/assets/icons/opensea.svg"
                        width="36"
                        height="36"
                        alt="Opensea"
                      />
                    </NextLink>
                  </NavLinkForIcon>
                  <NavLinkForIcon>
                    <NextLink
                      href="http://discord.com"
                      onClick={handleMenuClose}
                    >
                      <Image
                        src="/assets/icons/discord.svg"
                        width="36"
                        height="36"
                        alt="Discord"
                      />
                    </NextLink>
                  </NavLinkForIcon>
                  <NavLinkForIcon>
                    <NextLink
                      href="https://twitter.com/abdulwajidsid"
                      onClick={handleMenuClose}
                    >
                      <Image
                        src="/assets/icons/twitter.svg"
                        width="36"
                        height="36"
                        alt="Twitter"
                      />
                    </NextLink>
                  </NavLinkForIcon>
                </CenterSpaceAround>
              </PageWrapperDark>
            )}

            {/* Menue */}
            {!isMobile && (
              <React.Fragment>
                <NextLink href="http://opensea.com">
                  <Image
                    src="/assets/icons/opensea.svg"
                    width="36"
                    height="36"
                    alt="Opensea"
                  />
                </NextLink>

                <NextLink href="http://discord.com">
                  <Image
                    src="/assets/icons/discord.svg"
                    width="36"
                    height="36"
                    alt="Discord"
                  />
                </NextLink>

                <NextLink href="http://twitter.com">
                  <Image
                    src="/assets/icons/twitter.svg"
                    width="36"
                    height="36"
                    alt="Twitter"
                  />
                </NextLink>
              </React.Fragment>
            )}

            <HeaderBtn>
              <ConnectKitButton.Custom>
                {({ show, isConnected }) => {
                  return (
                    <StyledConnectButton onClick={show}>
                      {isConnected ? "Disconnect" : "Connect"}
                    </StyledConnectButton>
                  );
                }}
              </ConnectKitButton.Custom>

              {/* Hamburger Button - Fixed position */}
              {isMobile && (
                <StyledButton
                  style={{ zIndex: "999", margin: "0", padding: "0" }}
                >
                  <Hamburger
                    toggled={isOpen}
                    toggle={handleMenuToggle}
                    size={19.2}
                  />
                </StyledButton>
              )}
            </HeaderBtn>
          </NavBarContainer>
        </CenterSpaceBetween>
      </MaxWidth>
    </StyledNav>
  );
}
