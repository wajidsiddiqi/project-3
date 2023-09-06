// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

error KingKat__TokenNonexistent();
error KingKat__MintNotEnabled();
error KingKat__NotEnoughMoneySent();
error KingKat__WeSoldOut();
error KingKat__WrongId();

contract KingKat is ERC1155, Ownable, ERC1155Supply {
	uint256 private constant TOKEN_A = 1;
	uint256 private s_mintState = 1;
	uint256 private constant PRICE = 0.01 ether;
	uint256 private constant MAX_SUPPLY = 15;

	constructor()
		ERC1155(
			"ipfs://bafkreiccfopvgkp6yb44f62oh5tlbrf5bvpqvn2x2sbjnmvv4rni57eitq"
		)
	{}

	function changeMintState() external onlyOwner {
		if (s_mintState != 1) s_mintState = 1;
		else s_mintState = 2;
	}

	function mint(uint256 id, uint256 quantity) public payable {
		if (s_mintState == 1) revert KingKat__MintNotEnabled();
		if (id > TOKEN_A) revert KingKat__WrongId();
		if (msg.value != PRICE * quantity) revert KingKat__NotEnoughMoneySent();
		if (totalSupply(id) + quantity > MAX_SUPPLY)
			revert KingKat__WeSoldOut();

		_mint(msg.sender, id, quantity, "");
	}

	function uri(
		uint256 id
	) public view virtual override returns (string memory) {
		if (!exists(id)) {
			revert KingKat__TokenNonexistent();
		}

		return string(abi.encodePacked(super.uri(id)));
	}

	function withdraw() external onlyOwner {
		uint256 ammount = address(this).balance;
		payable(msg.sender).transfer(ammount);
	}

	function mintBatch(
		address to,
		uint256[] memory ids,
		uint256[] memory amounts,
		bytes memory data
	) public onlyOwner {
		_mintBatch(to, ids, amounts, data);
	}

	// The following functions are overrides required by Solidity.

	function _beforeTokenTransfer(
		address operator,
		address from,
		address to,
		uint256[] memory ids,
		uint256[] memory amounts,
		bytes memory data
	) internal override(ERC1155, ERC1155Supply) {
		super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
	}

	//*Getter Functions
	function getTokenAId() public pure returns (uint256) {
		return TOKEN_A;
	}

	function getPrice() public pure returns (uint256) {
		return PRICE;
	}

	function getMaxSupply() public pure returns (uint256) {
		return MAX_SUPPLY;
	}

	function getMintState() public view returns (bool) {
		if (s_mintState != 1) return true;
		else return false;
	}
}
