<template>
	<view :class="darkMode?'darkMode marketPage':'marketPage'">
	    行情
	</view>
</template>

<script>
import { uniCard, uniSwiperDot, uniPagination, uniIcons, uniPopup } from '@dcloudio/uni-ui';
export default {
	components: {
	},
	data() {
		return {
			darkMode:false
		};
	},
	onLoad() {},
	onShow(){
		this.switchTheTheme()
	},
	methods: {
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
};
</script>

<style lang="scss" scoped>
// 暗黑模式
.darkMode{
	background:$darkMode-list-main-bg-color !important;
	color:$darkMode-list-text-color !important;
}
.marketPage {
	 background: #EEEEEE;
	 width: 100%;
	 height: 100%;
	 position: absolute;
}

</style>
