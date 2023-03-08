<template>
    <div class="container">
        <div class="content">
            <div class="logo">
                Fomo3D
            </div>
            <div class="operating">
                <div class="operating-item" v-for="(item, index) in operatingList" :key="index">
                    {{ item.title }}
                </div>
            </div>
            <div class="connect" @click="login()">
                {{ currentAddress ? currentAddress : 'Connect' }}
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
                        title: '已链接',
                        message: '已连接至matemask钱包',
                        type: 'success'
                    })
                    this.init()
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '该浏览器不支持'
                    })
                }
            }
        },
        init() {
            this.$store.commit('getCurrentAddress', window.ethereum.selectedAddress)
            this.currentAddress = this.$store.state.currentAddress
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(36, 36, 36, .5);
}

.content {
    display: inline-block;
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-weight: 600;
    font-size: 38px;
    color: #ffbf32;
}

.connect {
    padding: 6px 10px;
    border: 1px solid #ffbf32;
    border-radius: 4px;
    color: #ffbf32;
    cursor: pointer;
}

.connect:hover {
    background: #ffbf32;
    color: black;
}

.operating {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    padding-left: 60px;
}

.operating-item {
    font-size: 16px;
    font-weight: 400px;
    color: #ffbf32;
    margin-right: 30px;
    cursor: pointer;
}

.operating-item:hover {
    color: white;
}
</style>
