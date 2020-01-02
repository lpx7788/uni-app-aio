<template>
	<view class="indexPage">
		<view class="text-area swiperWrap">
			 <swiper class="swiper" style="width: 100%;" :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay"  :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in swiperInfo" :key="index" >
					<view class="swiper-item"  >
						<image :src='item.imgUrl' class="swiper-img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	 
	</view>
</template>

<script>
import { uniCard, uniSwiperDot, uniPagination, uniIcons, uniPopup } from '@dcloudio/uni-ui';
export default {
	components: {
		uniCard,
		uniPagination,
		uniIcons,
		uniPopup,
		uniSwiperDot
	},
	data() {
		return {
			title: 'Hello',
			extra: '教育科技公司',
			note: '',
			isFull: true,
		    indicatorDots: false,
			autoplay: true,
			interval: 2000,
			duration: 500,
			circular: true,
			swiperInfo: [
				{
					imgUrl: 'http://120.79.251.137:8082/previewADCoverPic/edc0c57ba56043f7a72cf550954752df.png'
				},
				{
					imgUrl: 'https://adminapi.manytrader.net/previewADCoverPic/4f58ff4fbacd4761b58b7089b6624189.png'
				}
			],
			current: 0,
			mode: 'round'
		};
	},
	onLoad() {},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		change(e) {
			this.current = e.detail.current;
		},
		clickBtn(){
			console.log(324234234);
		}
	}
};
</script>

<style lang="scss">
.indexPage {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.swiperWrap {
		width: 100%;
		height: 100%;
	}
		
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.swiper-img{
		width: 100%;
		height: 100%;
	}
	.testSass {
		margin: 20px;
		color: red;
	}
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
