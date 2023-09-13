import React from "react";
import Image from "next/image";
import {
  EnlargedImageContainer,
  EnlargedImageStyle,
  Modal,
} from "@/app/styles/styles";

export default function EnlargeImage({ isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <EnlargedImageContainer isOpen={isOpen}>
            <Image
              src="/assets/nfts/1.jpg"
              alt="NFT"
              width={0}
              height={0}
              layout="responsive"
              style={EnlargedImageStyle}
            />
          </EnlargedImageContainer>
        </Modal>
      )}
    </React.Fragment>
  );
}
