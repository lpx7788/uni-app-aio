<template>
    <view class="setPage">
        <uni-list>
            <uni-list-item class="mt10" title="重置密码"></uni-list-item>
            <uni-list-item class="mt10" title="关于我们"></uni-list-item>
            <uni-list-item class="agreement" title="用户协议"></uni-list-item>
            <uni-list-item class="mt10" title="当前版本 v1.0"></uni-list-item>
        </uni-list>
		<view class="loginOut">
			<button type="primary" @click="handleLoginOut">退出登录</button>
		</view>
    </view>
</template>

<script>
	import { uniList,uniListItem } from '@dcloudio/uni-ui';
    export default {
		components: {
			uniList,
			uniListItem,
		},
        data() {
            return {
                url: ''
            }
        },
        onLoad(e) {
			 
        },
		methods: {
			handleLoginOut(){
				uni.showModal({
				    title: '温馨提示',
				    content: '你确定要退出登录吗?',
				    success: function (res) {
				        if (res.confirm) {
				            uni.showLoading({
				                title: '退出成功'
				            });
							uni.setStorage('userInfo', {});
							uni.setStorage('token', '');
							uni.switchTab({
							      url: '/pages/mine/index',
								  // success(){
									 // let page = getCurrentPages().pop();  //跳转页面成功之后
									 // console.log(page);
							   //           if (!page) return;  
							   //           page.onLoad(); //如果页面存在，则重新刷新页面
								  // }
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
    }
</script>
<style lang="scss">
	
	page{
		background: #EEEEEE;
	}
	
	.setPage{
		.uni-list{
			background: #EEEEEE;
			.uni-list-item{
				background: #FFFFFF;
			}
			/deep/.uni-list-item__container:after{
				background-color: #FFFFFF ;
			}
		}
		.agreement{
			/deep/.uni-list-item__container:after{
				background-color: #c8c7cc !important;
			}
		}
		.loginOut{
			margin:80rpx 40rpx;
			button{
				font-size: 14px;
			}
		}
	}
	
</style>