<template>
	<view class="indexPage">
		<view class="text-area swiperWrap">
			 <swiper class="swiper" style="width: 100%;" :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay"  :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in swiperInfo" :key="index" >
					<view class="swiper-item"  >
						<image :src='item.coverPicUrl' class="swiper-img"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="tab-control " style="margin:10px">
				<uni-segmented-control :current="current" :values="tabItems" @clickItem="onClickTabItem" style-type="button" active-color="rgb(0, 122, 255)"></uni-segmented-control>
			    <view class="tab-content">
					<view v-show="current === 0">
						选项卡1的内容
					</view>
					<view v-show="current === 1">
						选项卡2的内容
					</view>
					<view v-show="current === 2">
						选项卡3的内容
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui';
export default {
	components: {
		uniSegmentedControl
	},
	data() {
		return {
		    indicatorDots: false,
			autoplay: true,
			interval: 2000,
			duration: 500,
			circular: true,
			tabItems: ['自选','现货商城','求购大厅'],
			current: 0,
			swiperInfo: [],
		};
	},
	onLoad() {
       this.getBannerDatas()
	},
	
	methods: {
		//获取轮播图的数据
		getBannerDatas(){
			let self = this;
			this.$uniRequest.post(this.$api.banner_list_url, {
			     type: 1
			}).then(function(res) {
				self.swiperInfo = res.data.returnObject
			}).catch(function(error) {
			    // console.log(error);
			});
		},
		//tab点击切换
		onClickTabItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
	}
};
</script>

<style lang="scss">
.indexPage {
	display: flex;
	flex-direction: column;
	align-tabItems: center;
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
 
}

</style>
