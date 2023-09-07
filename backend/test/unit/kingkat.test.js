const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("king Kat Nft Unit Tests", function () {
      let kingKat, deployer, kingKatDeployed;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["kingKat"]);
        kingKatDeployed = await deployments.get("KingKat");
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

      describe("Mint", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await kingKat.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await kingKat.getTokenAId();
        });

        it("reverts if mint is not open", async () => {
          await expect(
            kingKat.mint(id, quantity, { value: value })
          ).to.be.revertedWithCustomError(kingKat, "KingKat__MintNotEnabled");
        });

        it("reverts if wrong mint value added", async () => {
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);

          await expect(
            kingKat.mint(id, 2, { value: value })
          ).to.be.revertedWithCustomError(
            kingKat,
            "KingKat__NotEnoughMoneySent"
          );
        });

        it("reverts if we sold out", async () => {
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const maxSupply = await kingKat.getMaxSupply();

          for (let i = 0; i < maxSupply; i++) {
            const mintAccounts = accounts[i];
            const txResponse = await kingKat
              .connect(mintAccounts)
              .mint(id, quantity, {
                value: value,
              });
            await txResponse.wait(1);
          }

          await expect(
            kingKat.mint(id, quantity, { value: value })
          ).to.be.revertedWithCustomError(kingKat, "KingKat__WeSoldOut");
        });

        it("reverts if wrong token id added", async () => {
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);

          await expect(
            kingKat.mint(2, quantity, { value: value })
          ).to.be.revertedWithCustomError(kingKat, "KingKat__WrongId");
        });

        it("mints nft and updates accordingly", async () => {
          const txResponse1 = await kingKat.changeMintState();
          await txResponse1.wait(1);
          const txResponse = await kingKat.mint(id, quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const totalSupply = await kingKat.totalSupply(id);
          const userAddress = deployer.address;
          const userBalance = await kingKat.balanceOf(userAddress, id);

          assert.equal(totalSupply, 1);
          assert.equal(userBalance, 1);
        });
      });

      describe("Token URI", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await kingKat.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await kingKat.getTokenAId();
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);
        });

        it("reverts if id don't exist", async () => {
          await expect(kingKat.uri(id)).to.be.revertedWithCustomError(
            kingKat,
            "KingKat__TokenNonexistent"
          );
        });

        it("returns uri", async () => {
          const txResponse = await kingKat.mint(id, quantity, {
            value: value,
          });
          await txResponse.wait(1);
          const uri = await kingKat.uri(id);

          assert.equal(
            uri.toString(),
            "ipfs://bafkreiccfopvgkp6yb44f62oh5tlbrf5bvpqvn2x2sbjnmvv4rni57eitq"
          );
        });
      });

      describe("Withdraw", () => {
        let quantity, value, id;

        beforeEach(async () => {
          const price = await kingKat.getPrice();
          quantity = 1;
          value = BigInt(price.toString()) * BigInt(quantity);
          id = await kingKat.getTokenAId();
          const txResponse = await kingKat.changeMintState();
          await txResponse.wait(1);

          const accounts = await ethers.getSigners();
          const txResponse2 = await kingKat
            .connect(accounts[1])
            .mint(id, quantity, {
              value: value,
            });
          await txResponse2.wait(1);
        });

        it("fails if non owner withdraws", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[2];

          await expect(kingKat.connect(nonowner).withdraw()).to.be.revertedWith(
            "Ownable: caller is not the owner"
          );
        });

        it("successfully withdraws", async () => {
          const initialBalance = await ethers.provider.getBalance(
            kingKatDeployed.address
          );
          const initialOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );
          const tx = await kingKat.withdraw();
          const receipt = await tx.wait();

          const gasCost = receipt.gasUsed * tx.gasPrice;
          const finalBalance = await ethers.provider.getBalance(
            kingKatDeployed.address
          );
          const finalOwnerBalance = await ethers.provider.getBalance(
            deployer.address
          );

          assert.equal(finalBalance.toString(), "0");
          assert.equal(
            finalOwnerBalance.toString(),
            (initialOwnerBalance - gasCost + BigInt(initialBalance)).toString()
          );
        });
      });
    });
