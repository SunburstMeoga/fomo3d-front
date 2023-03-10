<template>
    <div class="all-purchase">
        <div class="purchase-container">
            <div class="purchase-item" @click="clickTeam(index)" v-for="(item, index) in purchaseList" :key="index">
                <div class="item-img" :class="currentTeam === index ? 'item-img-clicked' : ''">
                    <img :src="item.image" />
                </div>
                <div class="item-title" :class="currentTeam === index ? 'item-title-clicked' : ''">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="purchase-operating">
            <div class="operating-left">
                <div class="left-word">
                    Key
                </div>
                <div class="left-input">
                    <input type="number" v-model="keyNumber" @change="keysChange($event)">
                </div>
                <div class="left-currency">
                    {{ numFilter(ehtProportion) }} @HAH
                </div>
            </div>
            <div class="operating-right">
                <div class="send-hah right-button" @click="toSend()">
                    Send HAH
                </div>
                <div class="use-vault right-button">
                    Use Valut
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../const/config.js'
// import { Loading } from 'element-ui'
export default {
    data() {
        return {
            web3: new this.Web3(window.ethereum),
            purchaseList: [
                {
                    title: 'Snek',
                    image: require('../assets/snek.png'),
                    value: 2
                },
                {
                    title: 'Whale',
                    image: require('../assets/whale.png'),
                    value: 0
                },
                {
                    title: 'Bull',
                    image: require('../assets/bull.png'),
                    value: 3
                },
                {
                    title: 'Bear',
                    image: require('../assets/bear.png'),
                    value: 1
                }
            ],
            currentTeam: 0,
            keyNumber: 1,
            ehtProportion: 0
        }
    },
    mounted() {
        this.getEthByKey(1)
    },
    methods: {

        //  保留四位小数
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(4)
            return realVal
        },
        //  购买的keys发生变化
        keysChange(e) {
            const { value } = e.target
            console.log('检测到的变化' + value)
            this.getEthByKey(value)
        },
        getEthByKey(ethByValue) {
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.getEthByKeys(ethByValue).call().then((result) => {
                console.log('当前一个key需要', result, '个wei')
                this.ehtProportion = this.web3.utils.fromWei(result, 'ether')
            })
        },
        clickTeam(index) {
            this.currentTeam = index
        },
        toSend() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })

            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            let data = web3Contract.methods.buyKeys(this.keyNumber, this.currentTeam).encodeABI()
            this.web3.eth.sendTransaction({
                to: config.con_addr,
                from: window.ethereum.selectedAddress,
                data: data,
                value: this.web3.utils.toWei(this.ehtProportion, 'ether')
            })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log(confirmationNumber, receipt)
                    this.$notify({
                        title: 'Success',
                        message: 'Successful bet',
                        type: 'success'
                    })
                    this.keyNumber = 1
                    this.getEthByKey(this.keyNumber)
                    loading.close()
                })
                .on('error', (error) => {
                    loading.close()
                    this.$notify.error({
                        title: 'Error',
                        message: error.message
                    })
                })
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.purchase-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
}

.purchase-item {
    width: 200px;
    height: 200px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.item-img {
    width: 60%;
    padding: 20px;
    border-radius: 50%;
}

.item-title {
    color: white;
    font-size: 20px;
    font-weight: 500;
}

.item-img-clicked {
    background-image: radial-gradient(#ffbf32, rgba(255, 255, 2, .9), rgba(255, 191, 90, .5));
}

.item-title-clicked {
    color: #ffbf32;
}

.purchase-operating {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 50px;
    background: rgba(255, 191, 50);
    border-radius: 50px;
    margin: 0 auto;
    color: #242424;
}

.operating-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
}

.operating-right {
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.left-word,
.left-currency {
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
}

.left-input {
    flex: 1;
    height: 40px;
}

input {
    width: 100%;
    border-radius: 30px;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 16px;
}

.left-currency {
    margin-left: 10px;
}

.right-button {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 40px;
    border: 2px solid #242424;
    color: #242424;
    cursor: pointer;
    font-weight: 600;
}
</style>
