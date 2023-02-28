<template>
    <div class="title-container">
        <div class="first-title">
            {{ titleWord }}
        </div>
        <div class="second-title">
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
        },
    }
}
</script>

<style scoped>
.title-container {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    color: #ffbf32;
}

.first-title {
    font-size: 30px;
}

.second-title {
    text-indent: 20px;
    font-size: 16px;
}
</style>