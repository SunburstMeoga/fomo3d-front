<template>
    <div>
        <div class="py-3">
            <div class='w-11/12 ml-auto mr-auto text-primary'>
                <div class=''>
                    Round #{{ currentRound }}
                </div>
                <div class='text-xl font-medium'>
                    Contract will drain in
                </div>
                <div class='mb-1'>
                    {{ countTime }}
                </div>
                <div class='w-full h-0.5 bg-barWhite mb-1'>
                    <div class='bg-primary py-px' :style="{ width: barWidth }"></div>
                </div>
                <div>
                    <div class='flex justify-between text-primary mb-1' v-for='(item, index) in roundList' :key='index'>
                        <div class='text-sm'>
                            {{ item.title }}
                        </div>
                        <div class='flex flex-col items-end'>
                            <div class='text-sm'>
                                {{ item.content }}
                            </div>
                            <div class='text-xs'>
                                {{ item.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='flex flex-wrap justify-around items-center w-11/12 mr-auto ml-auto'>
                <div class='w-2/5 rounded text-primary flex flex-col items-center justify-center mb-2 bg-teamBg'
                    v-for='(item, index) in purchaseList' :key='index'>
                    <div class='text-lg'>
                        {{ item.title }}
                    </div>
                    <div class='w-full'>
                        <img :src='item.image' class="w-full" />
                    </div>
                    <div class='text-xl'>
                        {{ item.value }} HAH
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../const/config.js'
export default {
    data() {
        return {
            roundList: [
                {
                    title: 'Active Pot:',
                    content: 'loading...',
                    amount: '0 USD'
                },
                {
                    title: 'Your Keys:',
                    content: '0.00 Keys',
                    amount: 'Total 0 Keys'
                },
                {
                    title: 'Your Earnings:',
                    content: '0.0000 HAH',
                    amount: '0 USD'
                }
            ],
            purchaseList: [
                {
                    title: 'Snek',
                    image: require('../assets/snek.png'),
                    value: 0
                },
                {
                    title: 'Whale',
                    image: require('../assets/whale.png'),
                    value: 0
                },
                {
                    title: 'Bull',
                    image: require('../assets/bull.png'),
                    value: 0
                },
                {
                    title: 'Bear',
                    image: require('../assets/bear.png'),
                    value: 0
                }
            ],
            web3: new this.Web3(window.ethereum),
            currentRound: '-',
            countTime: 'Loading...',
            timer: null,
            barLongPoint: 0
        }
    },
    computed: {
        barWidth() {
            return this.barLongPoint + '%'
        }
    },
    mounted() {
        this.getInfo()
        this.web3.eth.getBalance(this.$store.state.currentAddress).then((res) => {
            console.log('余额', this.web3.utils.fromWei(res, 'ether'))
            this.roundList[2].content = ((this.web3.utils.fromWei(res, 'ether')) * 1).toFixed(4)
        })
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },

    methods: {
        countDown(endTimeStamp) {
            var nowTimeStamp = new Date().getTime()
            var time = {}
            if (endTimeStamp > nowTimeStamp) {
                var mss = endTimeStamp - nowTimeStamp
                var days = parseInt(mss / (1000 * 60 * 60 * 24))
                var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
                var seconds = parseInt((mss % (1000 * 60)) / 1000)
                time = {
                    day: days < 10 ? '0' + days : days,
                    hour: hours < 10 ? '0' + hours : hours,
                    minute: minutes < 10 ? '0' + minutes : minutes,
                    second: seconds < 10 ? '0' + seconds : seconds,
                    mss: mss
                }
                this.countTime = time.hour + ' : ' + time.minute + ' : ' + time.second
            } else {
                time = {
                    day: '00',
                    hour: '00',
                    minute: '00',
                    second: '00',
                    mss: '00'
                }
                clearInterval(this.timer)
                this.countTime = 'Loading...'
            }
            this.barLongPoint = (((time.hour * 60 * 60 + minutes * 60 + seconds) / 86400).toFixed(4)) * 100
        },
        getInfo() {
            let web3Contract = new this.web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.infos(this.$store.state.currentAddress).call().then((result) => {
                console.log('用户拥有的key：', result)
                this.roundList[1].content = result.balance + ' Keys'
            })
            web3Contract.methods.keysTotal().call().then((result) => {
                console.log('所有的keys', result)
                this.roundList[1].amount = 'Total ' + result + '  Keys'
            })
            web3Contract.methods.roundTime().call().then((result) => {
                console.log('倒计时时间戳', result)
                this.timer = setInterval(() => {
                    this.countDown(result * 1000)
                }, 1000)
            })
            web3Contract.methods.nextRound().call().then((result) => {
                console.log('当前回合', result)
                this.currentRound = result
            })
        }
    }
}
</script>

<style scoped></style>
