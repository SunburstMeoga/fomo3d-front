<template>
    <div class="py-3">
        <div class="w-11/12 mr-auto ml-auto sm:flex sm:bg-primary sm:rounded-full sm:h-12 sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-primary">
                <div>钱包地址:</div>
                <div class="flex justify-start items-center">
                    <div>
                        {{ addressFilter($store.state.walletInfo.address) }}
                    </div>
                    <div class="border border-primary rounded-2xl px-2 text-sm text-primary ml-2"
                        @click="copyContent($store.state.walletInfo.address)">
                        Copy
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center text-primary">
                <div>余额:</div>
                <div>{{ $store.state.walletInfo.balance }} HAH</div>
            </div>
        </div>

    </div>
</template>

<script>
import { addressFilter } from '@/utils/format'

export default {
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
    }
}
</script>

<style></style>