<template>
    <div class="bg-cover pb-4 bg-fixed bg-no-repeat bg-center home-main">
        <menu-bar></menu-bar>
        <div class="text-primary w-11/12 mr-auto ml-auto truncate sm:text-3xl sm:mt-8 sm:w-10/12"
            v-show="$store.state.currentAddress">
            Wallet: {{ $store.state.currentAddress }}
        </div>
        <div
            class="p-2 text-text bg-primary text-sm w-11/12 mr-auto ml-auto rounded text-center mb-4 mt-4 sm:text-2xl sm:mb-8 sm:mt-8 sm:w-10/12">
            THE
            ONLY WAY YOU
            LOSE
            IN
            THIS GAME
            IS IF YOU
            STOP PLAYING
        </div>
        <module-title
            secondTitle="Purchases of .1 HAH or more have a 1% chance to win some of the 0 HAH airdrop pot, instantly!"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <purchase></purchase>
        </div>
        <module-title titleWord="Valut"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <valut></valut>
        </div>
        <module-title titleWord="Vanity & referrals"
            secondTitle="Advise others to invest in this exit scam and we'll reward you 10% of everything they lose. In HAH"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <referrals></referrals>
        </div>
        <module-title titleWord="Round & Teams"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <prize-pool></prize-pool>
        </div>
    </div>
</template>

<script>

import MenuBar from '../components/MenuBar.vue'
import ModuleTitle from '../components/ModuleTitle.vue'
import Purchase from '../components/Purchase.vue'
import Valut from '../components/Valut.vue'
import Referrals from '../components/Referrals.vue'
import PrizePool from '../components/PrizePool.vue'

export default {
    components: {
        MenuBar,
        ModuleTitle,
        Purchase,
        Valut,
        Referrals,
        PrizePool
    },
    methods: {
        //  钱包地址显示处理
        addressFilter(value) {
            if (value === undefined) return
            let arr = value.split('')
            let targetStr
            let targetArr = []
            arr.map((item, index) => {
                if (index <= 3 || index >= arr.length - 4) {
                    targetArr.push(item)
                }
            })
            targetArr.splice(4, 0, '......')
            targetStr = targetArr.join('')
            return targetStr
        }
    }
}
</script>

<style scoped>
.home-main {
    background-image: url('../assets/homeBackground.jpg');
}
</style>
