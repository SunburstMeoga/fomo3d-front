<template>
    <div class="py-3">
        <div>
            <div class="flex justify-between items-center text-lg text-primary mb-3 w-11/12 ml-auto mr-auto"
                v-for="(item, index) in valutList" :key="index">
                <div class="item-title">
                    {{ item.title }}
                </div>
                <div class="item-content">
                    {{ item.content }} HAH
                </div>
            </div>
        </div>
        <div class="text-right text-2xl w-11/12 ml-auto mr-auto text-primary">0 USD</div>
        <div class="border-primary text-lg border rounded-full  w-11/12 ml-auto mr-auto text-center px-6 py-1 text-primary">
            Withdraw
        </div>
    </div>
</template>

<script>
import { config } from '../const/config'
export default {
    data() {
        return {
            valutList: [
                {
                    title: 'At Exit(estimated)',
                    content: '0.0000'
                },
                {
                    title: 'Exit Scammed',
                    content: '0.0000'
                },
                {
                    title: 'Bad Advice',
                    content: '0.0000'
                },
                {
                    title: 'Total Gains',
                    content: '0.0000'
                }
            ],
            web3: new this.Web3(window.ethereum)
        }
    },
    mounted() {
        this.web3.eth.getBalance(config.con_addr).then((res) => {
            console.log('合约余额', this.web3.utils.fromWei(res, 'ether'))
            this.valutList[0].content = ((this.web3.utils.fromWei(res, 'ether')) * 1).toFixed(4)
        })
    }
}
</script>

<style scoped></style>
