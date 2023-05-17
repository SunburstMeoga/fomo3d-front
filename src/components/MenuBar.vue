<template>
    <div class="w-full h-14 bg-current bg-opacity-50 flex justify-center items-center bg-teamBg sm:h-20">
        <div class="flex justify-between items-center w-11/12">
            <div class="text-4xl text-primary font-bold">
                Fomo3D
            </div>
            <!-- <div class="operating">
                <div class="operating-item" v-for="(item, index) in operatingList" :key="index">
                    {{ item.title }}
                </div>
            </div> -->
            <div class="px-2 py-1 text-primary rounded-sm border-primary border" @click="handleConnect()">
                <!-- {{ $store.state.walletInfo.address }}
                {{ $store.state.chainId }} -->
                {{ $store.state.walletInfo.address && $store.state.chainId === '0x539' ? 'Disconnect' : 'Connect' }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // web3: new this.Web3(window.ethereum),
            operatingList: [
                {
                    title: 'Language'
                },
                {
                    title: 'Community'
                },
                {
                    title: 'Tutorial'
                }
            ],

            currentAddress: 'Connect',
            // web3: new this.Web3(window.ethereum)

        }
    },
    mounted() {
        // this.init()
    },
    methods: {
        async login() {
            console.log('Login')
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                })
                this.getWalletBalance(accounts[0])
                localStorage.setItem('connectStatus', 'connect')
                console.log('store', this.$store.state.walletInfo)
            } catch (error) {
                console.error(error)
            }
        },
        getWalletBalance(address) {
            this.Web3.eth.getBalance(address).then((res) => {
                let walletInfo = {
                    address: address,
                    balance: this.Web3.utils.fromWei(res, 'ether')
                }
                // this.getNodeList()
                localStorage.setItem('walletInfo', JSON.stringify(walletInfo))
                localStorage.setItem('connectStatus', 'connect')
                console.log(localStorage.getItem('walletInfo'))
                // this.isConnect = true
                this.$store.commit('getWalletInfo', JSON.parse(localStorage.getItem('walletInfo')))
                console.log('store', this.$store.state.walletInfo)
            }).catch(err => {
                console.log('getbalance err', err)
            })
        },
        loginOut() {
            console.log('Login out')
            localStorage.removeItem('walletInfo')
            // localStorage.removeItem('earningsInfo')
            localStorage.setItem('connectStatus', 'disconnect')
            this.$store.commit('getWalletInfo', {})
        },
        handleConnect() {
            console.log(localStorage.getItem('connectStatus'))
            if (localStorage.getItem('connectStatus') === 'connect') {
                this.loginOut()
            } else if (!localStorage.getItem('connectStatus') || localStorage.getItem('connectStatus') === 'disconnect') {
                this.login()
            }

        },
    }
}
</script>

<style scoped></style>
