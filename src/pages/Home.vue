<template>
    <div class="pb-4 bg-fixed sm:bg-no-repeat min-h-screen bg-center opacity-5">
        <div ref="vantaRef" style="width:100%;height:100vh;position:fixed;z-index: -1;"></div>
        <menu-bar></menu-bar>
        <div class="bg-primary text-text rounded-lg mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12 p-2 text-center">
            {{ $t('word.illustrate') }}
        </div>
        <div v-if="$store.state.walletInfo.address && $store.state.chainId === '0x11623'">
            <module-title :titleWord="$t('account.infor')"></module-title>
            <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
                <account />
            </div>
        </div>

        <module-title :titleWord="$t('purchase.title')" :secondTitle="$t('purchase.tips')"></module-title>
        <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
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
        <module-title :titleWord="$t('round.title')"></module-title>
        <div class="card mt-2 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12">
            <prize-pool></prize-pool>
        </div>

        <div class="bg-primary text-text rounded-lg mt-4 mr-auto ml-auto mb-2 w-11/12 sm:w-10/12 p-2 text-center"
            @click="handleCode">
            {{ $t('word.share') }}
        </div>
        <van-overlay :show="showCode">
            <div class="p-4 bg-white wrapper">
                <div class="content">
                    <div id="qrcode" ref="qrcode" />
                </div>


                <!-- <qrcode-vue :value="shareUrl" :size="size" /> -->
                <!-- <div class="buy-button text-primary-word rounded text-sm button-word mt-10" @click="saveCode">
                    保存至手机
                </div> -->
            </div>
        </van-overlay>
    </div>
</template>

<script>

import * as THREE from 'three'
import Net from 'vanta/src/vanta.net'
import MenuBar from '../components/MenuBar.vue'
import ModuleTitle from '../components/ModuleTitle.vue'
import Purchase from '../components/Purchase.vue'
import Valut from '../components/Valut.vue'
import Referrals from '../components/Referrals.vue'
import PrizePool from '../components/PrizePool.vue'
import Account from '../components/Account'
import QrcodeVue from 'qrcode.vue'
import { Popup, Overlay } from 'vant';

import QRCode from 'qrcodejs2';



import { config } from '../const/config.js'

export default {
    components: {
        MenuBar,
        ModuleTitle,
        Purchase,
        Valut,
        Referrals,
        PrizePool,
        Account,
        [Popup.name]: Popup,
        [Overlay.name]: Overlay,

        QrcodeVue,
        QRCode
    },
    data() {
        return {
            shareUrl: `${window.location.href}?p_addr=${window.ethereum.selectedAddress}`,
            showCode: false,
            size: 600,
            qrcode: null
        }
    },
    methods: {
        //二维码弹窗
        handleCode() {
            // console.log(this.$refs.qrcode)

            // console.log(this.shareUrl)
            // this.$nextTick(function () {

            // })
            new QRCode(this.$refs.qrcode, {
                text: `${window.location.href}?p_addr=${window.ethereum.selectedAddress}`,
                width: 200,
                height: 200,
                colorDark: '#000',
                colorLight: '#fff',
                // correctLevel: QRCode.CorrectLevel.L
            })
            this.showCode = true



        },
    },
    mounted() {
        this.vantaEffect = Net({
            el: this.$refs.vantaRef,
            THREE: THREE,
            color: '#DA251D',
            backgroundColor: '#000000',
            mouseControls: true,
            touchControls: true,
            scale: 1.00,
            scaleMobile: 1.20,
        })
        this.shareUrl = `${window.location.href}?p_addr=${window.ethereum.selectedAddress}`
        console.log(this.shareUrl)
    },
    beforeDestroy() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy()
        }
    },
}
</script>

<style scoped>
.card {
    gap: 20px;
    border-radius: 11px;
    backdrop-filter: blur(3px);
    background-color: #262626;
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background: #fff;
}
</style>
