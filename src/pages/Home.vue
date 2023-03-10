<template>
    <div class="container">
        <div class="menu-bar">
            <menu-bar></menu-bar>
        </div>
        <div class="wallet-addres" v-show="$store.state.currentAddress">
            <!-- Wallet: {{ addressFilter($store.state.currentAddress) }} -->
            Wallet: {{ $store.state.currentAddress }}
        </div>
        <div class="tips">THE ONLY WAY YOU LOSE IN THIS GAME IS IF YOU STOP PLAYING</div>
        <div class="module-title">
            <module-title
                secondTitle="Purchases of .1 HAH or more have a 1% chance to win some of the 0 HAH airdrop pot, instantly!"></module-title>
        </div>
        <div class="purchase module">
            <purchase></purchase>
        </div>
        <div class="module-title">
            <module-title titleWord="Valut"></module-title>
        </div>
        <div class="valut module">
            <valut></valut>
        </div>
        <div class="module-title">
            <module-title titleWord="Vanity & referrals"
                secondTitle="Advise others to invest in this exit scam and we'll reward you 10% of everything they lose. In HAH"></module-title>
        </div>
        <div class="referrals module">
            <referrals></referrals>
        </div>
        <div class="module-title">
            <module-title titleWord="Round & Teams"></module-title>
        </div>
        <div class="prize-pool module">
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
import { config } from '../const/config.js'

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
        },
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: url("../assets/homeBackground.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
}

.menu-bar {
    width: 100%;
    height: 70px;
    position: sticky;
    top: 0;
}

.tips {
    width: 80%;
    padding: 8px 0;
    background: #ffbf32;
    color: #242424;
    border-radius: 4px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin: 40px auto 0 auto;
}

.module-title,
.wallet-addres {
    width: 80%;
    margin: 40px auto 0 auto;
}

.wallet-addres {
    color: #ffbf32;
    font-size: 24px;
    font-weight: 500;
}

.purchase {}

.module {
    width: 80%;
    margin: 10px auto 0 auto;
    border-radius: 6px;
    background: rgba(36, 36, 36, .7);
    padding-bottom: 20px;
}

.prize-pool {
    margin-bottom: 20px;
}
</style>
