<template>
    <div class="py-3">
        <div class="w-11/12 mr-auto ml-auto sm:flex sm:bg-primary sm:rounded-full sm:h-12 sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-primary">
                <div>Address:</div>
                <div class="flex justify-start items-center">
                    <div class="sm:hidden">
                        {{ addressFilter($store.state.walletInfo.address) }}
                    </div>
                    <div class="hidden sm:block">
                        {{ $store.state.walletInfo.address }}
                    </div>
                    <div class="border border-primary rounded rounded-2xl px-2 text-sm text-primary ml-2"
                        @click="copyContent($store.state.walletInfo.address)">
                        Copy
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center text-primary">
                <div>Balance:</div>
                <div>{{ $store.state.walletInfo.balance }} HAH</div>
            </div>
            <div class="flex justify-between items-center text-primary">
                <div>Total Keys:</div>
                <div>{{ keys }} </div>
            </div>
            <div class="flex justify-between items-center text-primary">
                <div>Earnings:</div>
                <div>{{ earnings }} </div>
            </div>
        </div>

    </div>
</template>

<script>
import { addressFilter } from '@/utils/format'
import { config } from '../const/config'

export default {
    data() {
        return {
            keys: 0,
            earnings: 0
        }
    },
    mounted() {
        this.getAccountInfo()
    },
    methods: {
        addressFilter,
        getAccountInfo() {
            let web3Contract = new this.Web3.eth.Contract(config.erc20_abi, config.con_addr)
            web3Contract.methods.keyHolders(window.ethereum.selectedAddress).call().then((result) => {
                console.log('keyHolders:', result)
                this.keys = result
                web3Contract.methods.totalKeysSold().call().then((totalKeysSold) => {
                    console.log('totalKeysSold', totalKeysSold)
                    web3Contract.methods.accumulatedHolderPrizeShare().call().then((res) => {
                        console.log('accumulatedHolderPrizeShare:', res)
                        this.earnings = res * result / totalKeysSold
                    })

                })

            })

        },
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
    }
}
</script>

<style></style>