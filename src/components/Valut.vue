<template>
    <div class="valut-container">
        <div class="valut-list">
            <div class="valut-item" v-for="(item, index) in valutList" :key="index">
                <div class="item-title">
                    {{ item.title }}
                </div>
                <div class="item-content">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <div class="usd">0 USD</div>
        <div class="valut-withdraw">
            Withdraw
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valutList: [
                {
                    title: 'At Exit(estimated)',
                    content: '0.0000 HAH'
                },
                {
                    title: 'Exit Scammed',
                    content: '0.0000 HAH'
                },
                {
                    title: 'Bad Advice',
                    content: '0.0000 HAH'
                },
                {
                    title: 'Total Gains',
                    content: '0.0000 HAH'
                }
            ]
        }
    }
}
</script>

<style scoped>
.valut-container {
    width: 100%;
    padding-top: 20px;
}

.valut-list {}

.valut-item {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 20px auto;
    font-size: 20px;
}

.valut-withdraw,
.usd {
    width: 90%;
    color: #ffbf32;
    margin: 0 auto;
}

.usd {
    font-size: 30px;
    text-align: right;
    margin-bottom: 10px;
}

.valut-withdraw {
    height: 40px;
    border-radius: 40px;
    border: 2px solid #ffbf32;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
}

.item-title {
    color: #fff;
}

.item-content {
    color: #ffbf32;
}
</style>
