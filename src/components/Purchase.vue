<template>
    <div class="">
        <div class="flex justify-around items-center flex-wrap py-2 px-2 sm:flex-no-wrap">
            <div class="w-5/12 mb-1 flex flex-col justify-center items-center sm:w-1/4" @click="clickTeam(index)"
                v-for="(item, index) in purchaseList" :key="index">
                <div class="w-9/12" :class="currentTeam === index ? 'text-primary' : ''">
                    <img :src="item.image" class="w-full" />
                </div>
                <div class="text-base text-text" :class="currentTeam === index ? 'item-title-clicked' : ''">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="w-11/12 mr-auto ml-auto">
            <div class="flex justify-between items-center text-primary">
                <div class="text-lg">
                    Key
                </div>
                <div class="w-2/4 h-8">
                    <input type="number" class="rounded-full border-none text-center h-full w-full" v-model="keyNumber"
                        @change="keysChange($event)">
                </div>
                <div class="text-lg">
                    {{ numFilter(ehtProportion) }} @HAH
                </div>
            </div>
            <div class="flex justify-between items-center py-4">
                <div class="border-primary text-lg border rounded-full px-6 py-1 text-primary" @click="toSend()">
                    Send HAH
                </div>
                <div class="border-primary text-lg border rounded-full px-6 py-1 text-primary">
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

<style scoped></style>
