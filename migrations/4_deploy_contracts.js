const ArtWork = artifacts.require("ArtWorksManager");

module.exports = function (deployer) {
  deployer.deploy(ArtWork);
};
