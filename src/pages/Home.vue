<template>
    <div class="pb-4 bg-fixed bg-teamBg sm:bg-no-repeat min-h-screen bg-center home-main1">
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
        <!-- <div class="bg-moduleBg bg-opacity-75 mt-2 mr-auto ml-auto mb-2 w-11/12 rounded sm:w-10/12">
            <prize-pool></prize-pool>
        </div> -->
        <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12  sm:w-10/12">
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
    background-image: url('../assets/dotted-map.png');
    background-size: contain;
    background-position: 50%;
}

.home-main1 {
    background:
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .15) 30%, rgba(255, 255, 255, .3) 32%, rgba(255, 255, 255, 0) 33%) 0 0,
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .1) 11%, rgba(255, 255, 255, .3) 13%, rgba(255, 255, 255, 0) 14%) 0 0,
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .2) 17%, rgba(255, 255, 255, .43) 19%, rgba(255, 255, 255, 0) 20%) 0 110px,
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .2) 11%, rgba(255, 255, 255, .4) 13%, rgba(255, 255, 255, 0) 14%) -130px -170px,
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .2) 11%, rgba(255, 255, 255, .4) 13%, rgba(255, 255, 255, 0) 14%) 130px 370px,
        radial-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .1) 11%, rgba(255, 255, 255, .2) 13%, rgba(255, 255, 255, 0) 14%) 0 0,
        linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%);
    background-size: 470px 470px, 970px 970px, 410px 410px, 610px 610px, 530px 530px, 730px 730px, 100% 100%;
    background-color: #840b2a;
}

.card {

    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(6px);
    background-color: rgba(218, 37, 29, 0.165);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 1px rgba(255, 255, 255, 0.4) solid;
    border-bottom: 1px rgba(40, 40, 40, 0.35) solid;
    border-right: 1px rgba(40, 40, 40, 0.35) solid;
}
</style>
