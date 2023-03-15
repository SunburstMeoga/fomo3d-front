<template>
    <div class="text-primary w-11/12 mr-auto ml-auto sm:flex sm:items-baseline sm:w-10/12">
        <div class="text-2xl font-medium sm:text-3xl">
            {{ titleWord }}
        </div>
        <div class="leading-4 text-xs sm:pl-2 sm:text-lg">
            {{ secondTitle }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleWord: {
            type: String,
            default: 'Purchase'
        },
        secondTitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped></style>
