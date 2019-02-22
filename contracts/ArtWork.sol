pragma solidity ^0.5.0;

contract GestionnaireArtworks {

    struct Artwork  {
        uint id;
        uint dimension;
        address author;
        address[] collaborator;
    }



    mapping(uint => Artwork) artwork;   // Map de n° artwork => Artwork

    // Artwork[] artworks ??

    public function addArtwork(uint idartwork, uint dimension, address author) {
        // assert( msg.sender== myAdmin ); // seul ?? peut créer des projets
        Artwork memory artwork;
        artwork.id = idartwork;
        artwork.dimensions = idartwork;
        artwork.author = author;
        artworks[idartwork] = artwork;
    }

    public function findArtworkByAuthor(address _author) {
        for ( int i =0 ; i< artworks.size ; i++ ) {
            if (artworks[i].author==author) {
                return artwork[i];
            }
        }
    }



}


contract ArtWork {
    struct info {
        address[20] authors;
        string name;
        string description;
        string tool;
        uint size;
        enum Format { PNG, JPEG, BMP, GIF, SVG, XCF, BLEND, MP3, OGG, WAV, AVI, MKV, FLV, MP4, XviD, PDF, XHTML, XML, TXT, DOCX, EXE, CBR, CBZ, RAR, ZIP }
        Format file;
    }

    mapping (uint => info ) someMapping
}
