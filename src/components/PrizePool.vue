<template>
    <div class="pool-container">
        <div class="content">
            <div class="round">
                <div class="round-num">
                    Round #1
                </div>
                <div class="round-drain">
                    Contract will drain in
                </div>
                <div class="round-time">
                    loading...
                </div>
                <div class="progress-bar">
                    <div class="bar-long"></div>
                </div>
                <div class="round-list">
                    <div class="round-item" v-for="(item, index) in roundList" :key="index">
                        <div class="item-title">
                            {{ item.title }}
                        </div>
                        <div class="item-content">
                            <div class="content-top">
                                {{ item.content }}
                            </div>
                            <div class="content-bottom">
                                {{ item.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="teams">
                <div class="teams-item" v-for="(item, index) in purchaseList" :key="index">
                    <div class="teams-title">
                        {{ item.title }}
                    </div>
                    <div class="teams-img">
                        <img :src="item.image" />
                    </div>
                    <div class="teams-hah">
                        {{ item.value }} HAH
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roundList: [
                {
                    title: 'Active Pot:',
                    content: 'loading...',
                    amount: '0 USD'
                },
                {
                    title: 'Your Keys:',
                    content: '0.00 Keys',
                    amount: 'Total 0 Keys'
                },
                {
                    title: 'Your Earnings:',
                    content: '0.0000 HAH',
                    amount: '0 USD'
                }
            ],
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
            ]
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

.pool-container {
    width: 100%;
    padding-top: 20px;
}

.content {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.round {
    width: 50%;
    color: #ffbf32;
}

.round-num,
.round-time {
    font-size: 16px;
    font-weight: 500;
}

.round-drain {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0 20px 0;
}

.round-time {
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 3px;
    background: #000;
    margin-bottom: 20px;
}

.bar-long {
    width: 80%;
    height: 2px;
    background: #ffbf32;
}

.round-list {}

.round-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: #fff;
    margin-bottom: 10px;
}

.item-title {
    font-size: 20px;
    font-weight: 500px;
}

.item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #ffbf32;
}

.content-top {
    font-size: 20px;
    font-weight: 500px;
}

.content-bottom {
    font-size: 14px;
    color: orchid;
}

.item-title {
    font-size: 16px;
    font-weight: 500;
    color: white;
}

.itme-content {}

.teams {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.teams-item {
    background: #212529;
    width: 48%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
}

.teams-title,
.teams-hah {
    color: #ffbf32;
    font-size: 14px;
    font-weight: 500;
}

.teams-img {
    width: 100px;
}

.teams-hah {
    font-size: 20px;
}
</style>
