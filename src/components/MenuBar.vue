<template>
    <div class="w-full h-14 bg-current bg-opacity-50 flex justify-center items-center bg-teamBg sm:h-20">
        <div class="flex justify-between items-center w-11/12">
            <div class="text-4xl text-primary">
                Fomo3D
            </div>
            <!-- <div class="operating">
                <div class="operating-item" v-for="(item, index) in operatingList" :key="index">
                    {{ item.title }}
                </div>
            </div> -->
            <div class="px-2 py-1 text-primary rounded-sm border-primary border" @click="login()">
                {{ currentAddress ? 'Disconnect' : 'Connect' }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            web3: new this.Web3(window.ethereum),
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
            currentAddress: 'Connect'
        }
    },
    mounted() {
        this.init()
    },
    methods: {

        async login() {
            if (!this.currentAddress) {
                if (typeof window.ethereum !== 'undefined') {
                    await window.ethereum.request({ method: 'eth_requestAccounts' })
                    this.$notify({
                        title: 'Connected',
                        message: 'Connected to matemask wallet',
                        type: 'success'
                    })
                    this.init()
                } else {
                    this.$notify.error({
                        title: 'Error',
                        message: 'This browser does not support'
                    })
                }
            } else {
                // 退出登录
            }
        },
        init() {
            this.$store.commit('getCurrentAddress', window.ethereum.selectedAddress)
            this.currentAddress = this.$store.state.currentAddress
            console.log(this.currentAddress)
        }
    }
}
</script>

<style scoped></style>
