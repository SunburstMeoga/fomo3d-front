<template>
    <div class="container">
        <div class="content">
            <div class="logo">
                Fomo3D
            </div>
            <div class="operating">
                <div class="operating-item" v-for="(item, index) in operatingList" :key="index">
                    {{ item.title }}
                </div>
            </div>
            <div class="connect">
                Connect
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            operatingList: [
                {
                    title: 'Language'
                },
                {
                    title: 'Community'
                },
                {
                    title: 'Tutorial'
                }
            ]
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(36, 36, 36, .5);
}

.content {
    display: inline-block;
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-weight: 600;
    font-size: 38px;
    color: #ffbf32;
}

.connect {
    padding: 6px 10px;
    border: 1px solid #ffbf32;
    border-radius: 4px;
    color: #ffbf32;
    cursor: pointer;
}

.connect:hover {
    background: #ffbf32;
    color: black;
}

.operating {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    padding-left: 60px;
}

.operating-item {
    font-size: 16px;
    font-weight: 400px;
    color: #ffbf32;
    margin-right: 30px;
    cursor: pointer;
}

.operating-item:hover {
    color: white;
}
</style>
