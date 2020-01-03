<template>
	<view class="products">
		<view v-for="(item,index) in products" :key="index" class="products-item uni-flex">
			<view class="icons uni-flex uni-column">
				<text v-if="item.deliveryType==='1'" class="blue-b">售</text>
				<text v-if="item.deliveryType==='2'">购</text>
				<text v-if="item.sign==='1'" class="blue">供</text>
				<text v-if="item.sign==='3'">客</text>
				<text v-if="item.isPresentIntegral==='1'">赠</text>
				<text v-if="item.carefullyChosenSeller==='1'" class="red-b">精</text>
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
					<text class="contractName uni-flex-item">{{item.contractName}}+{{item.floatingPrice}}</text>
					<view class="price uni-flex-item" :class="[item.releaseStatus==='1'?'red':'gray']">						
						<text v-if="item.priceType==='1'"><text class="price-icon">¥</text> {{Number(instrumentIdList[item.contractCode])+(item.showFloatingPrice==='Y'?Number(item.floatingPrice):0)}}</text>
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
		<view class="loadMore">
			<text>{{loadMore?'加载中...':'没有更多啦'}}</text>
		</view>
	</view>
</template>

<script>
	import uniq from "lodash/uniq";
	
	export default {
		data(){
			return {
				products: [], //商品
				contractCodes: [], //页面所有合约
				instrumentIdList: {}, //各合约对应最新价
				socket1: null, 
				socket2: null, 
				loadMore: true,
				page: 1,
			}
		},
		components: {
			
		},
		methods:{
			setSocket(){
				this.socket1 = uni.connectSocket({
					// url: 'wss://aio.manytrader.net/webSk/md?userCode=92587a2bfe824c0381889ae55a704fcb',
					url: 'ws://192.168.0.230:8080/webSk/md?userCode=92587a2bfe824c0381889ae55a704fcb',
					complete: ()=> {}
				});
				this.socket1.onOpen(()=>{
					// console.log('open')
				})
				this.socket1.onMessage((data)=>{
					let res = JSON.parse(data.data)
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
				
				this.socket2 = uni.connectSocket({
					url: 'ws://192.168.0.230:8080/webSk/service',
					complete: ()=> {}
				});
				this.socket2.onOpen(()=>{
					this.socket2.send({
						data: JSON.stringify({"action":"getInfoCount","access_token":"92587a2bfe824c0381889ae55a704fcb_763d00032f204df0990354e582d55b56"})
					})
				}) 
				this.socket2.onMessage((data)=>{
					// console.log(data.data)
				})
			},
			getProducts(){
				uni.request({
					method: 'post',
				    url: 'http://192.168.0.230:8080/v1.2/product/search', 
				    data: {
				        deliveryType: "1",
						categoryCode: "",
						searchKeyword: "",
						source: "1",
						pageNum: this.page,
						pageSize: "20",
						releaseStatus: ["1", "2"],
						sortType: "1",
						materialList: [],
						brandList: [],
						specList: [],
						wareHouseList: [],
						areaCode: "",
						locationJson: {cid: "440000", cip: "120.197.17.187", cname: "广东省"},
						categoryType: ""
				    },
				    header: {
				        'Access-Control-Allow-Origin': '*',
				        'Access-Control-Expose-Headers': 'Content-Disposition',
				        'Content-Type': 'application/json;charset=UTF-8',
				    },
				    success: (res) => {
						this.page++
				        this.products = this.products.concat(res.data.returnObject.products)
						if(this.products.length===res.data.returnObject.total) this.loadMore = false
						let contractCodes = this.products.map(item => item.contractCode)
						this.contractCodes = uniq(contractCodes)
						// this.socket1.onOpen(function(){
						// 	console.log('open')
							this.socket1.send({
								data: JSON.stringify({"instuementIds":this.contractCodes})
							})
						// }) 
				    } 
				});
			}
		},
		created(){
			
		},
		mounted(){
			this.setSocket()
			this.getProducts()
		},  
		onShow(){
			
		},
		onReachBottom(){
			this.getProducts()
		}
	}
</script>

<style lang="scss" scoped>
	.products{
		
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
		.gray{
			color: rgb(102,102,102);
		}
		.loadMore{
			text-align: center;
			font-size: 32rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #222;
		}
	}
</style>
