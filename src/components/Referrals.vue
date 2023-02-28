<template>
    <div class="vanity">
        <div class="vanity-list">
            <div class="list-item" v-for="(item, index) in vanityList" :key="index">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-content">{{ item.content }}</div>
                <div class="item-copy">Copy</div>
            </div>
        </div>
        <div class="register">Register new name</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            vanityList: [
                {
                    title: 'Wallet Referral:',
                    content: 'fomo3d.net/0x26e3ab522ca04ecdd4139E893F9abfADe7b129bf',
                },
                {
                    title: 'Anonymous Referral:',
                    content: 'fomo3d.net/',
                },
                {
                    title: 'Vanity Referral:',
                    content: 'fomo3d.net/'
                }
            ]
        }
    }
}
</script>

<style scoped>
.vanity {
    width: 100%;
    padding-top: 20px;
}

.list-item {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 20px auto;
    font-size: 20px;
}

.item-title {
    font-size: 20px;
    color: white;
    width: 20%;
}

.item-content {
    text-align: left;
    text-indent: 20px;
    color: #ffbf32;
    flex: 1;
}

.item-copy {
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #ffbf32;
    color: #ffbf32;
    cursor: pointer;
    border-radius: 4px;
}

.register {
    height: 40px;
    width: 90%;
    margin: 0 auto;
    border-radius: 40px;
    border: 2px solid #ffbf32;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    color: #ffbf32;
}
</style>
