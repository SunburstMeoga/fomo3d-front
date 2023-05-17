<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.getChainId()
  },
  mounted() {
    if (localStorage.getItem('connectStatus') && localStorage.getItem('connectStatus') === 'connect') {
      this.initWallet()
    }
  },
  methods: {
    async initWallet() {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.getWalletBalance(accounts[0])
        console.log('initWallet')
      } catch (error) {
        console.error(error)
      }
    },
    async getChainId() {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId"
        });
        console.log('当前链id', chainId)
        this.$store.commit('getChainId', chainId)
        if (chainId !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage'),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    async networkHasChanged() {
      window.ethereum.on('chainChanged', (chainChanged) => {
        console.log('当前链id', chainChanged)
        this.$store.commit('getChainId', chainChanged)

        if (chainChanged !== this.Config.chainId) {
          Dialog.alert({
            title: this.$t('dialog.checkNetwork'),
            message: this.$t('dialog.checkMessage'),
            confirmButtonText: this.$t('dialog.confirmButtonText'),
          }).then(() => {
            this.switchNetwork()
          });
        }
      })
    },

    getWalletBalance(address) {
      this.Web3.eth.getBalance(address).then((res) => {
        let walletInfo = {
          address: address,
          balance: this.Web3.utils.fromWei(res, 'ether')
        }

        localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
        localStorage.setItem('connectStatus', 'connect')
        this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
        console.log('store', this.$store.state.walletInfo)
      }).catch(err => {
        console.log('getbalance err', err)
      })
    },
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {}
</style>
