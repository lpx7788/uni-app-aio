<template>
    <view :class="darkMode?'darkMode setPage':'setPage'">
        <uni-list>
            <uni-list-item class="mt10" title="重置密码"></uni-list-item>
            <uni-list-item class="mt10" title="关于我们"></uni-list-item>
            <uni-list-item class="agreement" title="用户协议"></uni-list-item>
            <uni-list-item class="mt10" title="当前版本 v1.0"></uni-list-item>
			<uni-list-item class="mt10" title="夜间模式" @switchChange="switchChange"   :switch-checked="darkMode" :show-switch="true" :show-arrow="false"></uni-list-item>

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
                url: '',
				darkMode:false, //暗黑模式
            }
        },
		onShow(){
			this.switchTheTheme()
		},
		methods: {
			// 切换主题
			switchTheTheme(){
				this.darkMode = uni.getStorageSync('darkMode')?uni.getStorageSync('darkMode'):false;
				if(this.darkMode === true){
					this.$theme.DarkModeTheme()
				}else{
					this.$theme.CommonPatternTheme()
				}
			},
			//退出登录
			handleLoginOut(){
				uni.showModal({
				    title: '温馨提示',
				    content: '你确定要退出登录吗?',
				    success: function (res) {
				        if (res.confirm) {
				            uni.showLoading({
				                title: '退出成功'
				            });
							uni.clearStorage();
							uni.switchTab({
							      url: '/pages/mine/index',
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//是否开启暗黑模式
			switchChange(e){
				
				if (e.value) {
					uni.setStorageSync('darkMode',e.value)
					this.darkMode = true;
					this.$theme.DarkModeTheme()
				}else{
					uni.setStorageSync('darkMode',false)
					this.darkMode = false
					this.$theme.CommonPatternTheme()
				}
			},
		},
	
    }
</script>
<style lang="scss" scoped>
		
	// 暗黑模式	
	.darkMode{
		background:$darkMode-list-main-bg-color !important;
		.uni-list{
			background:$darkMode-list-main-bg-color !important;
		}
		/deep/.uni-list-item{
			background:$darkMode-list-bg-color !important;
			.uni-list-item__content-title{
				color:$darkMode-list-text-color !important;
			}	
		}
		/deep/.uni-list-item__container:after{
			background-color:  $darkMode-list-border-color !important;
		}
	}

	.setPage{
		background: #EEEEEE;
		width: 100%;
		height: 100%;
		position: absolute;
		.uni-list{
			background: #EEEEEE;
			.uni-list-item{
				background: #FFFFFF;
			}
			/deep/.uni-list-item__container:after{
				height: 0;
			}
		}
		.agreement{
			/deep/.uni-list-item__container:after{
				height: 1px;
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