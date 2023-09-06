const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("king Kat Nft Unit Tests", function () {
      let kingKat, deployer;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["kingKat"]);
        const kingKatDeployed = await deployments.get("KingKat");
        kingKat = await ethers.getContractAt(
          "KingKat",
          kingKatDeployed.address
        );
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const mintState = await kingKat.getMintState();
          const price = await kingKat.getPrice();
          const maxSupply = await kingKat.getMaxSupply();
          const id = await kingKat.getTokenAId();

          assert.equal(mintState, false);
          assert.equal(price.toString(), ethers.parseEther("0.01"));
          assert.equal(maxSupply, 15);
          assert.equal(id, 1);
        });
      });

      describe("Mint State Change", () => {
        it("changes mint state", async () => {
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);
          const mintState = await kingKat.getMintState();

          assert.equal(mintState, true);
        });

        it("reverts when non owner changes mint state", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];

          await expect(
            kingKat.connect(nonowner).changeMintState()
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });
      /*
      describe("NFT Reveal", () => {
        it("changes nft reveal", async () => {
          const txResponse = await roboPunksNft.isRevealed(true);
          await txResponse.wait(1);
          const revealState = await roboPunksNft.getRevealState();

          assert.equal(revealState, true);
        });

        it("reverts when non owner changes nft reveal", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];

          await expect(
            roboPunksNft.connect(nonowner).isRevealed(true)
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });

      describe("Set WL", () => {
        it("sets WL addresses", async () => {
          const txResponse = await roboPunksNft.setWhitelist([
            deployer.address,
          ]);
          await txResponse.wait(1);
          const whiteListed = await roboPunksNft.checkWhitelist(
            deployer.address
          );

          assert.equal(whiteListed, true);
        });

        it("reverts when non owner sets WL addresses", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];

          await expect(
            roboPunksNft.connect(nonowner).setWhitelist([deployer.address])
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });

      describe("WL Mint", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getWhitelistMintPrice();
          quantity = 1;
          value = price.mul(quantity);
        });

        it("reverts if WL is not open", async () => {
          await expect(
            roboPunksNft.whitelistMint(quantity, { value: value })
          ).to.be.revertedWith("WL mint not enabled");
        });

        it("reverts if not whitelisted", async () => {
          const txResponse = await roboPunksNft.changeNftMintState(false, true);
          await txResponse.wait(1);

          await expect(
            roboPunksNft.whitelistMint(quantity, { value: value })
          ).to.be.revertedWith("not whitelisted");
        });

        it("reverts if wrong mint value added", async () => {
          const txResponse1 = await roboPunksNft.changeNftMintState(
            false,
            true
          );
          await txResponse1.wait(1);
          const txResponse2 = await roboPunksNft.setWhitelist([
            deployer.address,
          ]);
          await txResponse2.wait(1);

          await expect(
            roboPunksNft.whitelistMint(2, { value: value })
          ).to.be.revertedWith("wrong mint value");
        });

        it("allows whitelist users to mint nft", async () => {
          const txResponse1 = await roboPunksNft.changeNftMintState(
            false,
            true
          );
          await txResponse1.wait(1);
          const txResponse2 = await roboPunksNft.setWhitelist([
            deployer.address,
          ]);
          await txResponse2.wait(1);
          const txResponse3 = await roboPunksNft.whitelistMint(quantity, {
            value: value,
          });
          await txResponse3.wait(1);
          const userAddress = deployer.address;
          const userBalance = await roboPunksNft.balanceOf(userAddress);
          const owner = await roboPunksNft.ownerOf(1);

          assert.equal(userBalance, 1);
          assert.equal(owner, userAddress);
        });
      });

      describe("Public Mint", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getPublicMintPrice();
          quantity = 1;
          value = price.mul(quantity);
        });

        it("reverts if public mint is not open", async () => {
          await expect(
            roboPunksNft.publicMint(quantity, { value: value })
          ).to.be.revertedWith("public mint not enabled");
        });

        it("reverts if wrong mint value added", async () => {
          const txResponse = await roboPunksNft.changeNftMintState(true, false);
          await txResponse.wait(1);

          await expect(
            roboPunksNft.publicMint(2, { value: value })
          ).to.be.revertedWith("wrong mint value");
        });

        it("allows public users to mint nft", async () => {
          const txResponse1 = await roboPunksNft.changeNftMintState(
            true,
            false
          );
          await txResponse1.wait(1);
          const txResponse2 = await roboPunksNft.publicMint(quantity, {
            value: value,
          });
          await txResponse2.wait(1);
          const userAddress = deployer.address;
          const userBalance = await roboPunksNft.balanceOf(userAddress);
          const owner = await roboPunksNft.ownerOf(1);

          assert.equal(userBalance, 1);
          assert.equal(owner, userAddress);
        });
      });

      describe("Internal Mint", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getPublicMintPrice();
          quantity = 1;
          value = price.mul(quantity);
          const txResponse = await roboPunksNft.changeNftMintState(true, false);
          await txResponse.wait(1);
        });

        it("reverts if we sold out", async () => {
          const accounts = await ethers.getSigners();
          const maxSupply = await roboPunksNft.getMaxSupply();

          for (let i = 0; i < maxSupply; i++) {
            const mintAccount = accounts[i];
            const txResponse = await roboPunksNft
              .connect(mintAccount)
              .publicMint(quantity, {
                value: value,
              });
            await txResponse.wait(1);
          }

          await expect(
            roboPunksNft.publicMint(quantity, { value: value })
          ).to.be.revertedWith("we sold out");
        });

        it("reverts if exceed's max wallet limit", async () => {
          for (let i = 0; i < 2; i++) {
            const txResponse = await roboPunksNft.publicMint(quantity, {
              value: value,
            });
            await txResponse.wait(1);
          }

          await expect(
            roboPunksNft.publicMint(quantity, { value: value })
          ).to.be.revertedWith("exceeded max wallet limit");
        });

        it("mints nft and updates accordingly", async () => {
          const txResponse = await roboPunksNft.publicMint(quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const totalSupply = await roboPunksNft.getTotalSupply();
          const walletMints = await roboPunksNft.getYourWalletMints(
            deployer.address
          );
          const userAddress = deployer.address;
          const userBalance = await roboPunksNft.balanceOf(userAddress);
          const owner = await roboPunksNft.ownerOf(1);

          assert.equal(totalSupply, 1);
          assert.equal(walletMints, 1);
          assert.equal(userBalance, 1);
          assert.equal(owner, userAddress);
        });
      });

      describe("Token URI", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getPublicMintPrice();
          quantity = 1;
          value = price.mul(quantity);
          const txResponse1 = await roboPunksNft.changeNftMintState(
            true,
            false
          );
          await txResponse1.wait(1);
          const txResponse2 = await roboPunksNft.publicMint(quantity, {
            value: value,
          });
          await txResponse2.wait(1);
        });

        it("returns base uri if reveal is off", async () => {
          const baseURI = await roboPunksNft.tokenURI(1);

          assert.equal(
            baseURI.toString(),
            "ipfs://bafybeidlnjv7bbart3azzizjh76ywpvtns67nz3c2pdu5xvytdrtwbeopu/"
          );
        });

        it("returns token uri", async () => {
          const txResponse = await roboPunksNft.isRevealed(true);
          await txResponse.wait(1);
          const tokenURI = await roboPunksNft.tokenURI(1);

          assert.equal(
            tokenURI.toString(),
            "ipfs://bafybeidlnjv7bbart3azzizjh76ywpvtns67nz3c2pdu5xvytdrtwbeopu/1.json"
          );
        });
      });

      describe("Withdraw", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getPublicMintPrice();
          quantity = 1;
          value = price.mul(quantity);
          const txResponse1 = await roboPunksNft.changeNftMintState(
            true,
            false
          );
          await txResponse1.wait(1);
          const accounts = await ethers.getSigners();
          const txResponse2 = await roboPunksNft
            .connect(accounts[1])
            .publicMint(quantity, {
              value: value,
            });
          await txResponse2.wait(1);
        });

        it("fails if non owner withdraws", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[2];

          await expect(
            roboPunksNft.connect(nonowner).withdraw()
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("successfully withdraws", async () => {
          const initialBalance = await ethers.provider.getBalance(
            roboPunksNft.address
          );
          const initialOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );
          const tx = await roboPunksNft.withdraw();
          const receipt = await tx.wait();
          const gasCost = receipt.gasUsed.mul(tx.gasPrice);
          const finalBalance = await ethers.provider.getBalance(
            roboPunksNft.address
          );
          const finalOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );

          assert.equal(finalBalance.toString(), "0");
          assert.equal(
            finalOwnerBalance.toString(),
            initialOwnerBalance.sub(gasCost).add(initialBalance).toString()
          );
        });
      });*/
    });
