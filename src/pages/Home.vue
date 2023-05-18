<template>
    <div class="bg-cover pb-4 bg-fixed bg-no-repeat min-h-screen bg-center home-main">
        <menu-bar></menu-bar>

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
        <div v-if="$store.state.walletInfo.address && $store.state.chainId === '0x11623'">
            <module-title titleWord="Account Information"></module-title>
            <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
                <account />
            </div>
        </div>

        <module-title secondTitle="Buy a certain number of keys to increase the time of the countdown clock"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <purchase></purchase>
        </div>

        <!--  <module-title titleWord="Valut"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <valut></valut>
        </div>
        <module-title titleWord="Vanity & referrals"
            secondTitle="Advise others to invest in this exit scam and we'll reward you 10% of everything they lose. In HAH"></module-title>
        <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <referrals></referrals>
        </div> -->
        <module-title titleWord="Round Information"></module-title>
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
import Account from '../components/Account'
import { config } from '../const/config.js'

export default {
    components: {
        MenuBar,
        ModuleTitle,
        Purchase,
        Valut,
        Referrals,
        PrizePool,
        Account
    },

}
</script>

<style scoped>
.home-main {
    background-image: url('../assets/homeBackground.jpg');
}
</style>
