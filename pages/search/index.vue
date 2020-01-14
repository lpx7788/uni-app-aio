<template>
	<view>
		<uniSearchBar cancelButton="always" placeholder="搜索商品" @confirm="searchProducts" @cancel="goBack"></uniSearchBar>
	</view>
</template>

<script>
	import { uniSearchBar } from '@dcloudio/uni-ui';
	
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				type: null,
				searchKey: '',
				products: [],
			}
		},
		methods: {
			// 获取搜索字段
			getSearchKey(){
				this.searchKey = e.value
				this.searchProducts()
			},
			// 查询商品
			searchProducts(e){
				let url = this.type===0?'product_userSelection_url':'product_search_url'
				this.$uniRequest.httpClient(this.$api[url],{
					deliveryType: this.type,
					// categoryCode: '',
					searchKeyword: "",
					source: "1",
					pageNum: this.page,
					pageSize: "20",
					// sortType: sortType,
					// releaseStatus: ["1","2"],
					// materialList: [],
					// brandList: [],
					// specList: [],
					// wareHouseList: [],
					// areaCode: "",
					locationJson: {cip: "120.197.17.187", cid: "440000", cname: "广东省"},
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
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			}
		},
		mounted(){
			
		},
		onLoad: function (option) {
			this.type = option.type
		}
	}
</script>

<style>

</style>
