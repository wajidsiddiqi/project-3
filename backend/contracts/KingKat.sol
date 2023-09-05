// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error KingKat__TokenNonexistent();

contract KingKat is ERC1155, Ownable, ERC1155Supply {
    uint256 private constant TOKEN_A = 1;
    uint256 private s_mintState = 1;
    uint256 private constant PRICE = 0.01 ether;
    uint256 private constant MAX_SUPPLY = 15;

    constructor()
        ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/")
    {}

    function changeMintState() public onlyOwner {
        if (s_mintState != 1) s_mintState = 1;
        else s_mintState = 2;
    }

    function mint(uint256 id, uint256 amount) public payable {
        _mint(msg.sender, id, amount, "");
    }

    function uri(
        uint256 id
    ) public view virtual override returns (string memory) {
        if (!exists(id)) {
            revert KingKat__TokenNonexistent();
        }

        return
            string(
                abi.encodePacked(super.uri(id), Strings.toString(id), ".json")
            );
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
