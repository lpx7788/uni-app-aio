<template>
    <view :class="darkMode?'darkMode webviewPage':'webviewPage'">
        <web-view :class="darkMode?'darkMode':''" :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: '',
				darkMode:false
            }
        },
        onLoad(e) {
			this.switchTheTheme()
            this.url = e.url
        },
		
		methods:{
			//切换主题
			switchTheTheme(){
				this.darkMode = uni.getStorageSync('darkMode')?uni.getStorageSync('darkMode'):false
				if(this.darkMode === true){
					this.$theme.DarkModeTheme()
				}else{
					this.$theme.CommonPatternTheme()
				}
			},
		}
    }
</script>
<style lang="scss" scoped>
// 暗黑模式	
.darkMode{
	background:$darkMode-list-main-bg-color !important;
}
</style>
