const ArtWork = artifacts.require("ArtworksManager");

module.exports = function (deployer) {
  deployer.deploy(ArtWork);
};
