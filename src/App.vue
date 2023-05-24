<template>
  <div id="app">
    <router-view />
    <div class="kuang">
      <div class="bubble" v-for="(item, index) in 20" :key="index" />
    </div>
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
        // if (chainId !== this.Config.chainId) {
        //   Dialog.alert({
        //     title: this.$t('dialog.checkNetwork'),
        //     message: this.$t('dialog.checkMessage'),
        //     confirmButtonText: this.$t('dialog.confirmButtonText'),
        //   }).then(() => {
        //     this.switchNetwork()
        //   });
        // }
        this.switchNetwork()
      } catch (err) {
        console.error(err);
      }
    },
    async switchNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.Config.chainId }],
        })
      } catch (err) {
        console.error(err)
        if (err.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: this.Config.chainId,
                  chainName: 'Hash Ahead Testnet',
                  rpcUrls: ['https://rpc-testnet.hashahead.org'],
                  iconUrls: ['https://testnet.hashahead.org/logo.png'],
                  blockExplorerUrls: ['https://testnet.hashahead.org/'],
                  nativeCurrency: {
                    name: 'HAH',
                    symbol: 'HAH',
                    decimals: 18
                  }
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }

        }
      }
    },
    async networkHasChanged() {
      window.ethereum.on('chainChanged', (chainChanged) => {
        console.log('当前链id', chainChanged)
        this.$store.commit('getChainId', chainChanged)

        if (chainChanged !== this.Config.chainId) {
          // Dialog.alert({
          //   title: this.$t('dialog.checkNetwork'),
          //   message: this.$t('dialog.checkMessage'),
          //   confirmButtonText: this.$t('dialog.confirmButtonText'),
          // }).then(() => {
          //   this.switchNetwork()
          // });
          this.switchNetwork()

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

.kuang {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background: #000000;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #434343, #000000);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #434343, #000000);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.bubble {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: inset 0 0 8px #fff;
  animation: flutter 10s infinite;
  opacity: 0;
}

@keyframes flutter {
  0% {
    transform: translateX(0);
    bottom: -100px;
    opacity: 1;
  }

  50% {
    transform: translateX(100px);
    opacity: 0.5;
  }


  100% {
    transform: translateX(0px);
    bottom: 100%;
    opacity: 0;

  }
}

.bubble:nth-child(1) {
  left: -10%;
  width: 50px;
  height: 50px;
  animation-duration: 9s;
  animation-delay: 0.1s;
}

.bubble:nth-child(2) {
  left: 15%;
  width: 20px;
  height: 20px;
  animation-duration: 6s;
  animation-delay: 1.5s;

}

.bubble:nth-child(3) {
  left: 20%;
  width: 60px;
  height: 60px;
  animation-duration: 10s;



}

.bubble:nth-child(4) {
  left: 30%;
  width: 30px;
  height: 30px;
  animation-duration: 5.5s;
  animation-delay: 1.5s;

}

.bubble:nth-child(5) {
  left: 40%;
  width: 50px;
  height: 50px;
  animation-duration: 12s;
}

.bubble:nth-child(6) {
  left: 50%;
  width: 20px;
  height: 20px;
  animation-duration: 6s;
  animation-delay: 1s;

}

.bubble:nth-child(7) {
  left: 60%;
  width: 40px;
  height: 40px;
  animation-duration: 8s;
  animation-delay: 1s;

}

.bubble:nth-child(8) {
  left: 65%;
  width: 60px;
  height: 60px;
  animation-duration: 15s;

}

.bubble:nth-child(9) {
  left: 80%;
  width: 55px;
  height: 55px;
  animation-duration: 9s;
  animation-delay: 0.5s;

}

.bubble:nth-child(10) {
  left: 100%;
  width: 40px;
  height: 40px;
  animation-duration: 12s;
}

.bubble:nth-child(11) {
  left: 100%;
  width: 30px;
  height: 30px;
  animation-duration: 12s;

}

body {}
</style>
