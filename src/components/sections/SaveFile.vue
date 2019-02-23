<template>
  <div
    id="save-file"
  >
    <h3>Add file to the blockchain</h3>
    <v-form v-model="valid">
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md12
          >
            <v-text-field
              v-model="fileChecksum"
              :counter="10"
              label="Checksum of the file"
              name="checksum"
              required
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex
            xs12
            md12
          >
            <v-text-field
              v-model="tokenInfo"
              :counter="10"
              label="JWT Token Info"
              name="token"
              required
            />
          </v-flex>
        </v-layout>
        <div>
          <label class="warning-label">Please fill all fields.</label>
          <v-btn
            depressed
            small
            color="primary"
            type="button"
            value="Submit"
            @click="pushFileToBlockchain"
          >
            Submit
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'SaveFile',
  data: function () {
    return {
      valid: false,
      contract: null,
      fileChecksum: "",
      tokenInfo: "",
      isAfterMount: false,
    }
  },
  created: function () {
    this.Utils.contracts.ArtWorksManager = TruffleContract(data);
    this.Utils.contracts.ArtWorksManager.setProvider(this.Utils.web3.currentProvider)
  },
  methods: {
    pushFileToBlockchain(evt = null) {
      /*const _thus = this;
      document.querySelector('.warning-label').style.display = 'none';
      evt.target.disabled = true;
      const fileObject = {
        fileChecksum: `b${this.fileChecksum || ''}`,
        tokenInfo: `b${this.tokenInfo || ''}`
      };

      const vueUserObject = Object.assign({}, fileObject, {
        fileChecksum: this.fileChecksum || '',
        tokenInfo: this.tokenInfo || ''
      });

      let artworkInstance;

      this.Utils.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
        }

        const account = accounts[0];

        this.Utils.contracts.ArtWorksManager.deployed().then((instance) => {
          artworkInstance = instance;
          return artworkInstance.addArtwork(_thus.fileChecksum, _thus.tokenInfo, [account], [], {from: account})
        })
      });*/
    }
  }
}
</script>
