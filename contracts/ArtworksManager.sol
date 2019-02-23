pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./lib/arachnid/solidity-stringutils/strings.sol";

contract ArtworksManager {
  struct Artwork  {
    bytes32 checksum;
    bytes32 info;
    address[] authors;
    address[] collaborators;
  }

  // Map de n° artwork => Artwork
  mapping(bytes32 => Artwork) artworks;
  bytes32[] artworkArray;

  function addArtwork(bytes32 _idartwork, bytes32 _info, address[] memory _authors, address[] memory _collaborators) public {
    Artwork memory artwork;
    artwork.checksum = _idartwork;
    artwork.info = _info;
    artwork.authors = _authors;
    artwork.collaborators = _collaborators;
    artworks[_idartwork] = artwork;
    artworkArray.push(_idartwork);
  }

  function findArtworkById(bytes32 _id) public view returns(Artwork memory, bool) {
    Artwork memory response;
    bool found = false;
    for ( uint i = 0 ; i < artworkArray.length ; i++ ) {
      if (strings.equals(strings.toSliceB32(artworkArray[i]), strings.toSliceB32(_id))) {
        response = artworks[_id];
        found = true;
        break;
      }
    }
    return (response, found);
  }


  function findArtworkByAuthor(address _author) public view returns(Artwork memory, bool) {
    Artwork memory response;
    bool found = false;
    for ( uint i = 0; i < artworkArray.length ; i++ ) {
      Artwork memory artwork = artworks[artworkArray[i]];
      for ( uint j = 0; j < artwork.authors.length;  j++){
        if (artwork.authors[j] == _author){
          response = artwork;
          found = true;
          break;
        }
      }
    }
    return (response, found);
  }

  function findArtworkByCollaborator(address _collaborator) public view returns(Artwork memory, bool) {
    Artwork memory response;
    bool found = false;
    for ( uint i = 0; i < artworkArray.length ; i++ ) {
      Artwork memory artwork = artworks[artworkArray[i]];
      for ( uint j = 0; j < artwork.collaborators.length;  j++){
        if (artwork.collaborators[j] == _collaborator){
          response = artwork;
          found = true;
          break;
        }
      }
    }
    return (response, found);
  }
}
