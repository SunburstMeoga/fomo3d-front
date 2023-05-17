<template>
    <div class="py-3">
        <div class="w-11/12 mr-auto ml-auto sm:flex sm:bg-primary sm:rounded-full sm:h-12 sm:justify-between sm:px-10">
            <div class="flex justify-between items-center text-primary">
                <div>钱包地址:</div>
                <div>{{ addressFilter($store.state.walletInfo.address) }}</div>
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
        addressFilter
    }
}
</script>

<style></style>