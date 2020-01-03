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
	</view>
</template>

<script>
import {  } from '@dcloudio/uni-ui';
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
			// if(uni.getSystemInfoSync().platform === 'android')
			
			// {
			console.log(uni.getSystemInfoSync().platform );
			console.log(this.passwordInputValue);
		}
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
}

</style>
