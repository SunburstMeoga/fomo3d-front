<template>
    <div class="py-3">
        <div>
            <div class="flex justify-between items-center text-sm text-primary mb-3 w-11/12 ml-auto mr-auto sm:text-lg"
                v-for="(item, index) in vanityList" :key="index">
                <div class="truncate">{{ item.title }} {{ item.content }}</div>
                <div class="border-primary text-sm border rounded text-center px-2 text-primary sm:py-2 sm:px-6 sm:text-lg"
                    @click="copyWord(item)">
                    Copy</div>
            </div>
        </div>
        <div class="border-primary text-lg border rounded-full  w-11/12 ml-auto mr-auto text-center px-6 py-1 text-primary">
            Register new name</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            vanityList: [
                {
                    title: 'Wallet Referral:',
                    content: 'HAHBlock.net/-'
                }
                // {
                //     title: 'Anonymous Referral:',
                //     content: 'HAHBlock.net/'
                // },
                // {
                //     title: 'Vanity Referral:',
                //     content: 'HAHBlock.net/'
                // }
            ]
        }
    },
    mounted() {
        this.vanityList[0].content = 'HAH3d.net/' + this.$store.state.currentAddress
    },
    methods: {
        copyWord(item) {
            navigator.clipboard.writeText(item.content)
            this.$notify({
                title: 'Copied',
                message: 'Copied content to clipboard',
                type: 'success'
            })
        }
    }
}
</script>

<style scoped></style>
