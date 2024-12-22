// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CompanyExperienceNFT is ERC721URIStorage, Ownable {
    struct Company {
        string name;
        string registrationNumber;
        address walletAddress;
        bool isRegistered;
    }

    // Mapping of company addresses to their details
    mapping(address => Company) public companies;

    // Event for company registration
    event CompanyRegistered(
        address indexed walletAddress,
        string name,
        string registrationNumber
    );

    // Event for NFT issued
    event NFTIssued(
        uint256 indexed tokenId,
        address indexed employee,
        string tokenURI
    );

    // Constructor to set the NFT name and symbol
    constructor() ERC721("ExperienceNFT", "EXP") {}

    /**
     * @dev Register a company with its details.
     * @param _name Name of the company.
     * @param _registrationNumber Unique registration number of the company.
     */
    function registerCompany(string memory _name, string memory _registrationNumber) public {
        require(!companies[msg.sender].isRegistered, "Company already registered");
        require(bytes(_name).length > 0, "Company name is required");
        require(bytes(_registrationNumber).length > 0, "Registration number is required");

        companies[msg.sender] = Company({
            name: _name,
            registrationNumber: _registrationNumber,
            walletAddress: msg.sender,
            isRegistered: true
        });

        emit CompanyRegistered(msg.sender, _name, _registrationNumber);
    }

    /**
     * @dev Issue an NFT for an employee with details.
     * @param _employee Address of the employee.
     * @param _tokenURI Metadata URI for the NFT.
     */
    function issueNFT(address _employee, string memory _tokenURI) public {
        require(companies[msg.sender].isRegistered, "Only registered companies can issue NFTs");
        require(_employee != address(0), "Invalid employee address");

        uint256 newTokenId = totalSupply() + 1;
        _mint(_employee, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        emit NFTIssued(newTokenId, _employee, _tokenURI);
    }

    /**
     * @dev Check if a company is registered.
     * @param _company Address of the company to check.
     * @return True if the company is registered, false otherwise.
     */
    function isCompanyRegistered(address _company) public view returns (bool) {
        return companies[_company].isRegistered;
    }
}
