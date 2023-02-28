<template>
    <div class="all-purchase">
        <div class="purchase-container">
            <div class="purchase-item" @click="clickTeam(index)" v-for="(item, index) in purchaseList" :key="index">
                <div class="item-img" :class="currentTeam === index ? 'item-img-clicked' : ''">
                    <img :src="item.image" />
                </div>
                <div class="item-title" :class="currentTeam === index ? 'item-title-clicked' : ''">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="purchase-operating">
            <div class="operating-left">
                <div class="left-word">
                    Key
                </div>
                <div class="left-input">
                    <input type="number" v-model="keyNumber">
                </div>
                <div class="left-currency">
                    @BNB
                </div>
            </div>
            <div class="operating-right">
                <div class="send-hah right-button">
                    Send HAH
                </div>
                <div class="use-vault right-button">
                    Use Valut
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            purchaseList: [
                {
                    title: 'Snek',
                    image: require('../assets/snek.png'),
                    value: 0
                },
                {
                    title: 'Whale',
                    image: require('../assets/whale.png'),
                    value: 0
                },
                {
                    title: 'Bull',
                    image: require('../assets/bull.png'),
                    value: 0
                },
                {
                    title: 'Bear',
                    image: require('../assets/bear.png'),
                    value: 0
                }
            ],
            currentTeam: 0,
            keyNumber: 1
        }
    },
    methods: {
        clickTeam(index) {
            this.currentTeam = index
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.purchase-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
}

.purchase-item {
    width: 200px;
    height: 200px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.item-img {
    width: 60%;
    padding: 20px;
    border-radius: 50%;
}

.item-title {
    color: white;
    font-size: 20px;
    font-weight: 500;
}

.item-img-clicked {
    background-image: radial-gradient(#ffbf32, rgba(255, 255, 2, .9), rgba(255, 191, 90, .5));
}

.item-title-clicked {
    color: #ffbf32;
}

.purchase-operating {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 50px;
    background: rgba(255, 191, 50);
    border-radius: 50px;
    margin: 0 auto;
    color: #242424;
}

.operating-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
}

.operating-right {
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.left-word,
.left-currency {
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
}

.left-input {
    flex: 1;
    height: 40px;
}

input {
    width: 100%;
    border-radius: 30px;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 16px;
}

.left-currency {
    margin-left: 10px;
}

.right-button {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 40px;
    border: 2px solid #242424;
    color: #242424;
    cursor: pointer;
    font-weight: 600;
}
</style>