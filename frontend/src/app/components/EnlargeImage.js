import React from "react";
import Zoom from "react-reveal/Zoom";
import { EnlargedImageContainer, ImageStyle, Modal } from "@/app/styles/styles";

export default function EnlargeImage({ isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <EnlargedImageContainer isOpen={isOpen}>
            <Zoom>
              <img src="/assets/nfts/1.jpg" alt="NFT" style={ImageStyle} />
            </Zoom>
          </EnlargedImageContainer>
        </Modal>
      )}
    </React.Fragment>
  );
}
