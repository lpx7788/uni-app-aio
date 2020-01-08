<template>
	<view class="indexPage products">
		<view class="text-area swiperWrap">
			 <swiper class="swiper" style="width: 100%;" :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay"  :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in swiperInfo" :key="index" >
					<view class="swiper-item" :style="'background: url('+ item.coverPicUrl + ') center center / cover no-repeat'" >
						<!-- <image :src='item.coverPicUrl' class="swiper-img"></image> -->
					</view>
				</swiper-item>
			</swiper>
			<view class="stickyBox">				
				<navTab ref="navTab" class="navTab" :tabTitle="tabTitle" @changeTab='changeTab' ></navTab>
				<view class="hotCategory uni-flex">
					<view class="title">
						热门品种：
					</view>
					<view class="categoryNames">
						<scroll-view :scroll-x="true">
							<text v-for="(item,idx) in hotCategoryNames" :key="idx" @click="changeHotCategory(item)">{{item.categoryName}}</text>
						</scroll-view>
					</view>
				</view>
				<navTab ref="navTab_filter" class="navTab" :tabTitle="tabTitle_filter" @changeTab='changeTab_filter' :showUnderline="false"></navTab>
			</view>
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(tabItem,tabIndex) in tabTitle" :key="tabIndex">
					<scroll-view style="height: 100%;" :scroll-y="scrollY" scroll-with-animation @scrolltolower="scrolltolower">
						<view class="" >
							<view v-for="(item,index) in products[tabIndex]" :key="index" class="products-item uni-flex">
								<view class="icons uni-flex uni-column">
									<text v-if="item.deliveryType==='1'" class="blue-b">售</text>
									<text v-if="item.deliveryType==='2'" class="brown-b">购</text>
									<text v-if="item.sign==='1'" class="blue-b">供</text>
									<text v-if="item.sign==='3'" class="brown-b">客</text>
									<text v-if="item.isPresentIntegral==='1'" class="red-b">赠</text>
									<text v-if="item.carefullyChosenSeller==='1'" class="green-b">精</text>
								</view> 
								<view class="contents uni-flex-item">
									<view class="top">
										<text class="categoryName">{{item.categoryName}}</text>
										<text class="attribute uni-ellipsis">
											<text class="brand">{{item.brand}}</text>
											<text class="spec">{{item.spec}}</text>
											<text class="material">{{item.material}}</text>
										</text>
									</view>
									<view class="middle uni-flex">
										<text class="uni-column uni-flex-item">{{item.stockNum===-1?'不限':item.stockNum+'吨'}}</text>
										<text v-if="item.priceType==='1'" class="contractName uni-flex-item">{{item.contractName}}+{{item.floatingPrice}}</text>
										<view class="price uni-flex-item" :class="[item.releaseStatus==='1'?'red':'gray']">						
											<text v-if="item.priceType==='1'">
												<text class="price-icon">¥</text> 
												<!-- {{Number(instrumentIdList[item.contractCode])+(item.showFloatingPrice==='Y'?Number(item.floatingPrice):0)}} -->
												{{addition(item)}}
											</text>
											<text v-else>{{item.basePrice}}</text>
										</view>
									</view>
									<view class="bottom uni-flex">
										<text class="company uni-flex-item">{{item.shortName}}-{{item.userName}}</text>
										<text class="wareHouse uni-flex-item uni-ellipsis">{{item.wareHouse}}</text>
										<text class="releaseStatus uni-flex-item" :class="[item.releaseStatus==='1'?'red':'gray']">{{item.releaseStatus==='1'?'在售中':'已售完'}}</text>
									</view>
								</view>
							</view>
							<uniLoadMore :status="loadMore[tabIndex]"></uniLoadMore>
							<view class="none">
								{{loadMoreText}}
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { uniSegmentedControl,uniLoadMore } from '@dcloudio/uni-ui';
import uniq from "lodash/uniq";
import navTab from '../../components/navTab.vue'
import http from '../../utils/http.js'
	
export default {
	components: {
		uniSegmentedControl,
		uniLoadMore,
		navTab
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
			products: [[],[],[]], //商品
			contractCodes: [], //页面所有合约
			instrumentIdList: {}, //各合约对应最新价
			loadMore: ['more','more','more'],
			pages: [1,1,1],
			currentTab: 0,
			tabTitle: ['自选','现货商城','求购大厅'],
			tabTitle_filter: ['智能排序','价格优先','数量优先'],
			hotCategoryNames: [],
			scrollY: false,
			loadMoreText: '上拉',
			sortType: [0,0,0],
		};
	},
	onLoad() {
		this.getHotCategory()
		this.getBannerDatas()
		this.products.forEach((item,idx)=>{
			this.getProducts(idx)
		})
		uni.$on('socket_md_cb',(data)=>{
			let res = data.res
			// ****** instrumentIdList需要先清空再赋值才能渲染成功 ****** start
			let instrumentIdList = this.instrumentIdList
			this.instrumentIdList = {}
			this.instrumentIdList = instrumentIdList
			// ****** instrumentIdList需要先清空再赋值才能渲染成功 ****** end
			// 有新合约或最新价有变动时才更新instrumentIdList
			if(this.instrumentIdList.hasOwnProperty(res.instrumentId)||this.instrumentIdList[res.instrumentId]!==res.lastPrice){
				let instrumentId = res.instrumentId.toUpperCase()
				this.instrumentIdList[instrumentId] = res.lastPrice
			}
		})
	},
	methods: {
		// 选择热门品种
		changeHotCategory(item){
			
		},
		// 获取热门品种
		getHotCategory(){
			this.$uniRequest.post(this.$api.getHotCategory_url, {
			    
			}).then((res)=>{
				this.hotCategoryNames = res.data.returnObject
			}).catch(function(error) {
			    // console.log(error);
			});
		},
		// 重置商品数据
		reset(idx){
			this.pages[idx] = 1
			this.loadMore[idx] = 'more'
			this.products[idx] = []
		},
		changeTab_filter(e){
			this.sortType[this.currentTab] = e
			this.reset(this.currentTab)
			this.getProducts(this.currentTab)
		},
		//计算商品价格
		addition(item){ 
			return Number(this.instrumentIdList[item.contractCode])+(item.showFloatingPrice==='Y'?Number(item.floatingPrice):0)
		},
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
		getProducts(idx){
			this.loadMoreText = '加载'
			this.loadMore[idx] = 'loading'
			let sortType = this.sortType[idx] + 1
			let url = idx===0?'product_userSelection_url':'product_search_url'
			// this.$uniRequest.post(this.$api[url], {
			// console.log(http.requestPost)
			http.requestPost(this.$api[url],{
				deliveryType: idx,
				// categoryCode: "",
				// searchKeyword: "",
				// source: "1",
				pageNum: this.pages[idx],
				pageSize: "20",
				// releaseStatus: ["1", "2"],
				sortType: sortType,
				// materialList: [],
				// brandList: [],
				// specList: [],
				// wareHouseList: [],
				// areaCode: "",
				// locationJson: {cip: "120.197.17.187", cid: "440000", cname: "广东省"},
				// categoryType: ""
			}).then((res)=>{
				uni.stopPullDownRefresh() //停止下拉刷新
				this.products[idx] = this.products[idx].concat(res.data.returnObject.products)
				if(this.products[idx].length>=res.data.returnObject.total){
					this.loadMore[idx] = 'noMore'
					this.loadMoreText = '没有'
				}else{
					this.loadMoreText = '上拉'
					this.loadMore[idx] = 'more'
					this.pages[idx]++
				}
				let contractCodes = this.products[idx].map(item => item.contractCode)
				this.contractCodes = uniq(this.contractCodes.concat(contractCodes))
				uni.$emit('socket_md',{
					data: JSON.stringify({"instuementIds":this.contractCodes})
				})
			}).catch(function(error) {
			    // console.log(error);
			});
		},
		swiperTab: function(e) {
			let index = e.detail.current //获取索引
			this.$refs.navTab_filter.longClick(this.sortType[index],true)
			this.$refs.navTab.longClick(index,true)
		},
		changeTab(index){
			this.currentTab = index
			this.$refs.navTab_filter.longClick(this.sortType[index],true)
		},
		scrolltolower(){
			if(this.loadMore[this.currentTab] === 'noMore') return
			this.getProducts(this.currentTab)
		}
	},
	
	mounted(){
		
	},  
	onPullDownRefresh(){ //下拉
		setTimeout(()=>{				
			uni.startPullDownRefresh({
				success: ()=>{
					this.products = [[],[],[]], //商品
					this.contractCodes = [], //页面所有合约
					this.instrumentIdList = {}, //各合约对应最新价
					this.loadMore = ['more','more','more'],
					this.pages = [1,1,1],
					this.getBannerDatas()
					this.products.forEach((item,idx)=>{
						this.getProducts(idx)
					})
				}
			});
		},1000)
	},
	onPageScroll(e) {
		if(e.scrollTop>=150){
			this.scrollY = true
		} else {
			this.scrollY = false
		}
	},
};
</script>

<style lang="scss" scoped>
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
.products{
		
		.navTab::after{ //下边框
			position: absolute;
			box-sizing: border-box;
			content: ' ';
			pointer-events: none;
			right: 0;
			bottom: 0;
			left: 0;
			border-bottom: 1px solid #ebedf0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
		.hotCategory{
			background-color: #fff;
			padding: 20rpx 0;
			.title{
				width: 25vw;
				text-align: center;
			}
			.categoryNames{
				width: 75vw;
				white-space: nowrap;
				text{
					padding: 0 10rpx;
				}
			}
		}
		.hotCategory::after{ //下边框
			position: absolute;
			box-sizing: border-box;
			content: ' ';
			pointer-events: none;
			right: 0;
			bottom: 0;
			left: 0;
			border-bottom: 1px solid #ebedf0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
		.products-item{
			position: relative;
			padding: 30rpx;
			.icons{
				width: 40rpx;
				color: #fff;
				font-size: 20rpx;
				uni-text{
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					border-radius: 5rpx;
					margin-bottom: 5rpx;
				}
			}
			.contents::after{ //下边框
				position: absolute;
				box-sizing: border-box;
				content: ' ';
				pointer-events: none;
				right: 0;
				bottom: 0;
				left: 0;
				border-bottom: 1px solid #ebedf0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
			.contents{
				.middle,.bottom{
					justify-content: space-between;
					font-size: 24rpx;
					color: rgb(102,102,102);
					align-items: center;
				}
				.middle .price{
					display: inline;
					text-align: right;
					font-size: 36rpx;
					.price-icon{
						font-size: 24rpx;
					}
				}
				.bottom .releaseStatus{
					text-align: right;
				}
				.categoryName{
					font-size: 32rpx;
				}
				.attribute{
					margin-left: 13rpx;
					padding-left: 13rpx;
					border-left: 1rpx solid #e4e4e4;
				}
			}
		}
		.stickyBox{
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 99;
		}
		.red{
			color: rgb(255,59,48);
		}
		.red-b{
			background-color: rgb(255,59,48);
		}
		.blue{
			color: #4e67fd;
		}
		.blue-b{
			background-color: #4e67fd;
		}
		.green-b{
			background-color: #62b59a;
		}
		.gray{
			color: rgb(102,102,102);
		}
		.brown-b{
			background-color: #d3a37a;
		}
	}
</style>
