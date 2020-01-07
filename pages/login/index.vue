<template>
	<view class="loginPage sola">
	      <view class=' options-section'>
	        <view class='item'>
	          <view class='left'>
	            <image class='icon' src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_phone@2x.png' mode='widthFix'></image>
	            <input type='digit' placeholder="输入新的手机号码" v-model="phoneInputValue" ></input>
	          </view>
	        </view>
	        <view class='item'>
	          <view class='left'>
	            <image class='icon' src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_guide@2x.png' mode='widthFix'></image>
	            <input type="password" v-model="passwordInputValue" placeholder="输入密码"></input>
	          </view>
	        </view>
	      </view>
	      <button class="loginBtn" @click="handleLogin()" >登录</button>
		  <view class="uni-flex forget">
		  	<text class="uni-flex-item uni-center register ">立即注册</text>
		  	<text class="uni-flex-item uni-center">忘记密码</text>
		  </view>
		  <!-- <view class="third">
		  	<view class="cut">
		  		<text>使用社交账号登录</text>
		  	</view>
		  	<view class="other">
		  		<view class="weixin" >
				</view>
		  	</view>
		  </view> -->
	</view>
</template>

<script>
import {  } from '@dcloudio/uni-ui';
import common from '../../utils/common.js'
export default {
	components: {
	},
	data() {
		return {
			phoneInputValue:'',
			passwordInputValue:''
		};
	},
	onLoad() {},
	methods: {
	    //登录操作
		handleLogin(){
			let self = this;
			if(common.checketEmpty(self.phoneInputValue,'请输入电话号码')===false){
				return 
			}else if(common.checketPhone(self.phoneInputValue,'请输入正确的11位手机号码！')===false){
				return 
			}else if(common.userPassword(self.passwordInputValue)===false){
				return 
			}
			this.$uniRequest.post(this.$api.user_login, {
			     userPhone: self.phoneInputValue,
			     userPassword:self.passwordInputValue,
				 equipmentNo:"43846ad34489y4j4u8f8vcj1"
			}).then(function(res) {
				if(res){
					uni.showToast({
						title: '登录成功',
					});
					//存儲信息
					uni.setStorageSync('userInfo', res.data.returnObject);
                    //跳转首页
					uni.reLaunch({
						url: '/pages/index/index',
					})
				}
			}).catch(function(error) {
			    // console.log(error);
			});
		},
	}
};
</script>

<style lang="scss">
.loginPage {

	input {
	  margin-left: 20rpx;
	}
	button {
	  margin: 80rpx 30rpx 0;
	  background-color: #4d65fd;
	  color: #fff;
	  font-size: 30rpx;
	}
	.register{
		color: #007AFF;
	}
	.icon{
	  width: 36rpx;
	  height: 36rpx;
	}
	.options-section {
	  background: #fff;
	  margin-top: 20rpx;
	  padding-left: 30rpx;
	  .left {
		display: flex;
		align-items: center;
		flex: 1;
	  }
	  .item {
		display: flex;
		height: 96rpx;
		border-bottom: 1px solid #f0f0f0;
	  }
	}
	.forget{
		margin-top: 10px;
	}
	.loginBtn{
		margin-top:30px !important;
	}
	
	.third {
			position: absolute;
			    width: 100%;
			    bottom: 60px;
				.cut {
					color:#a4a4a4;
					text-align: center;
					position: relative;
					& > text { font-size: 22rpx; }
					&::before { left: 0 }
					&::after { right: 0 }
					&::before,&::after {
						position: absolute;
						width: 30%;
						height: 1px;
						background: #dfdfdf;
						content: '';
						top: 50%;
						margin-top: 2px;
					}
				}
				.other {
					display: flex;
					justify-content: center;
					margin-top: 20rpx;
					& > view {
						width: 120rpx;
						height: 120rpx;
						border-radius: 100%;
						background-repeat: no-repeat;
						background-position: center center;
						&.weixin {
							background-image: url('https://admin.sinlu.net/weixinpl/shopping-temp/images/login_weixin.png');
							background-size: 120rpx 120rpx;
						}
					}
				}
			// }			
	}
}

</style>
