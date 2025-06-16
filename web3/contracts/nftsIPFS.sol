// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {

    address payable contractOwner = payable(0x45c48283Fd3C5343074AdAE65F0E1AEa6bE23554);
    uint256 public listingPrice = 0.01 ether;

    struct NFT {
        string title;
        string description;
        string email;
        string category;
        uint256 fundraised;
        string image;
        address creator;
        uint256 timestamp;
        uint256 id;
    }

    mapping(uint256 => NFT) public nftsImages;

    uint256 public imagesCount = 0; 

    function uploadIPFS(
    address _creator, 
    string memory _title, 
    string memory _description, 
    string memory _email, 
    string memory _category, 
    string memory _image
) 
    public 
    payable 
    returns (
        string memory,
        string memory,
        string memory,
        address,
        string memory
    ) 
{
    imagesCount++;
    NFT storage nft = nftsImages[imagesCount];

    nft.title = _title;
    nft.creator = _creator;
    nft.description = _description;
    nft.email = _email;
    nft.category = _category;
    nft.image = _image;
    nft.timestamp = block.timestamp;
    nft.id = imagesCount;

    return (_title, _description, _email, _creator, _image);
}

    function getNFTs() public view returns(NFT[] memory) {
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFT[] memory items = new NFT[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            NFT storage currentItem = nftsImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function getImage(uint256 id) external view returns(
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        string memory,
        address,
        uint256,
        uint256){
            NFT memory nft = nftsImages[id];
            return (nft.title, nft.description, nft.email, nft.category, nft.fundraised, nft.image, nft.creator, nft.timestamp, nft.id);
        }

    function updateListingPrice(uint256 _listingPrice, address owner) public payable {
        require(contractOwner == owner, "Only the owner can update the listing price");
        listingPrice = _listingPrice;
    }    

    function donateToImage(uint256 _id) public payable {
        uint256 amount = msg.value;
        NFT storage nft = nftsImages[_id];

        (bool sent,) = payable(nft.creator).call{value: amount}("");
        if(sent) {
            nft.fundraised = nft.fundraised + amount;
        }
    }

    function withdrawAll(address _owner) public payable {
        require(_owner == contractOwner, "Only the owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        contractOwner.transfer(balance);
    }
}