<template>
    <div>
        <div class="py-3 sm:flex sm:justify-between">
            <div class='w-11/12 ml-auto mr-auto text-primary'>
                <div class=''>
                    Round #{{ currentRound }}
                </div>
                <div class='text-xl font-medium sm:font-bold sm:text-3xl'>
                    Contract will drain in
                </div>
                <div class='mb-1 sm:text-xl'>
                    {{ countTime }}
                </div>
                <div class='w-full h-0.5 bg-barWhite mb-1'>
                    <div class='bg-primary py-px' :style="{ width: barWidth }"></div>
                </div>
                <div class="sm:mt-10">
                    <div class='flex justify-between text-primary mb-1 sm:mb-2' v-for='(item, index) in roundList'
                        :key='index'>
                        <div class='text-sm sm:text-lg'>
                            {{ item.title }}
                        </div>
                        <div class='flex flex-col items-end'>
                            <div class='text-sm flex justify-start items-center sm:text-lg'>
                                <div>
                                    {{ item.content }}
                                </div>
                                <div v-if="index === 0"
                                    class="border border-primary rounded-2xl px-2 text-sm text-primary ml-2"
                                    @click="copyContent(item.content)">
                                    Copy
                                </div>
                            </div>
                            <!-- <div class='text-xs sm:text-sm'>
                                {{ item.amount }}
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class='flex flex-wrap justify-between items-center w-11/12 mr-auto ml-auto sm:w-2/5 sm:justify-around'>
                <div class='w-9/20 rounded text-primary flex flex-col items-center justify-center mb-2 bg-teamBg bg-opacity-75 sm:w-2/5'
                    v-for='(item, index) in purchaseList' :key='index'>
                    <div class='text-lg'>
                        {{ item.title }}
                    </div>
                    <div class='w-full sm:w-1/2 sm:flex sm:justify-center sm:items-center'>
                        <img :src='item.image' class="w-full" />
                    </div>
                    <div class='text-xl'>
                        {{ item.value }} HAH
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { config } from '../const/config'
import { addressFilter } from '@/utils/format'

export default {
    data() {
        return {
            roundList: [
                {
                    title: 'Last Buyer:',
                    content: '-',
                    amount: '0 USD'
                },
                {
                    title: 'Pot:',
                    content: '0.00 Keys',
                    amount: 'Total 0 Keys'
                },
                {
                    title: 'Total Keys Sold:',
                    content: '0.0000 HAH',
                    amount: '0 USD'
                },
                {
                    title: 'Round Count:',
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
            // web3: new this.Web3(window.ethereum),
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
        // this.web3.eth.getBalance(this.$store.state.currentAddress).then((res) => {
        //     console.log('余额', this.web3.utils.fromWei(res, 'ether'))
        //     this.roundList[2].content = ((this.web3.utils.fromWei(res, 'ether')) * 1).toFixed(4)
        // })
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },

    methods: {
        addressFilter,
        copyContent(content) {
            if (!content) return
            navigator.clipboard.writeText(content).then(() => {
                this.$notify({
                    title: 'Success',
                    message: 'Copy Succeeded',
                    type: 'success'
                })
            }, () => {
                // this.$message.error(this.$t('message.fail'));
                this.$notify.error({
                    title: 'Error',
                    message: error.message
                })
            });
        },
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
            // console.log(new this.Web3.eth.Contract(config.erc20_abi, config.con_addr))
            // return
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.lastBuyer().call().then((result) => {
                console.log('lastBuyer:', result)
                this.roundList[0].content = this.addressFilter(result)
            })
            web3Contract.methods.lastBuyTimestamp().call().then((result) => {
                console.log('lastBuyTimestamp:', result)
                this.timer = setInterval(() => {
                    this.countDown(parseInt(result) * 1000)
                }, 1000)
            })
            web3Contract.methods.pot().call().then((result) => {
                console.log('pot:', result)
                this.roundList[1].content = result + ' HAH'

            })
            web3Contract.methods.totalKeysSold().call().then((result) => {
                console.log('totalKeysSold:', result)
                this.roundList[2].content = result + ' HAH'

            })
            web3Contract.methods.roundCount().call().then((result) => {
                console.log('roundCount:', result)
                this.roundList[3].content = result + ' HAH'
                this.currentRound = parseInt(result) + 1
            })
            web3Contract.methods.keyHolders(window.ethereum.selectedAddress).call().then((result) => {
                console.log('keyHolders:', result)
            })
        }
    }
}
</script>

<style scoped></style>
