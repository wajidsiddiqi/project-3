import React from "react";
import { EnlargedImageContainer, ImageStyle, Modal } from "@/app/styles/styles";

export default function EnlargeImage({ isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <EnlargedImageContainer isOpen={isOpen}>
            <img src="/assets/nfts/1.jpg" alt="NFT" style={ImageStyle} />
          </EnlargedImageContainer>
        </Modal>
      )}
    </React.Fragment>
  );
}
