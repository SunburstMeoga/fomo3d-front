<template>
    <div class='pool-container'>
        <div class='content'>
            <div class='round'>
                <div class='round-num'>
                    Round #{{ currentRound }}
                </div>
                <div class='round-drain'>
                    Contract will drain in
                </div>
                <div class='round-time'>
                    {{ countTime }}
                </div>
                <div class='progress-bar'>
                    <div class='bar-long' :style="{ width: barWidth }"></div>
                </div>
                <div class='round-list'>
                    <div class='round-item' v-for='(item, index) in roundList' :key='index'>
                        <div class='item-title'>
                            {{ item.title }}
                        </div>
                        <div class='item-content'>
                            <div class='content-top'>
                                {{ item.content }}
                            </div>
                            <div class='content-bottom'>
                                {{ item.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='teams'>
                <div class='teams-item' v-for='(item, index) in purchaseList' :key='index'>
                    <div class='teams-title'>
                        {{ item.title }}
                    </div>
                    <div class='teams-img'>
                        <img :src='item.image' />
                    </div>
                    <div class='teams-hah'>
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

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pool-container {
    width: 100%;
    padding-top: 20px;
}

.content {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.round {
    width: 50%;
    color: #ffbf32;
}

.round-num,
.round-time {
    font-size: 16px;
    font-weight: 500;
}

.round-drain {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0 20px 0;
}

.round-time {
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 3px;
    background: #000;
    margin-bottom: 20px;
}

.bar-long {
    height: 2px;
    width: 0;
    background: #ffbf32;
}

.round-list {}

.round-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: #fff;
    margin-bottom: 10px;
}

.item-title {
    font-size: 20px;
    font-weight: 500px;
}

.item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #ffbf32;
}

.content-top {
    font-size: 20px;
    font-weight: 500px;
}

.content-bottom {
    font-size: 14px;
    color: orchid;
}

.item-title {
    font-size: 16px;
    font-weight: 500;
    color: white;
}

.itme-content {}

.teams {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.teams-item {
    background: #212529;
    width: 48%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
}

.teams-title,
.teams-hah {
    color: #ffbf32;
    font-size: 14px;
    font-weight: 500;
}

.teams-img {
    width: 100px;
}

.teams-hah {
    font-size: 20px;
}
</style>
