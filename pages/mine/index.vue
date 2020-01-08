<template>
	<view class="minePage">
	     <view class='section head-section' bindtap='loginBtn'>
	        <view class="head-section-content">
	          <view class="head-section-content-top">
	           <view class="userName" v-if="userList==''||JSON.stringify(userList)=='{}'||userList.token==''" >
	              <view> 未登录</view>
	              <view class="tologin">
	                立即登录，进行交易！
	              </view>
	            </view>
	            <view class="userName" v-else>
	             <view class="userName-top" v-if="userList!==''||JSON.stringify(userList)==!'{}'">
	               <span class="userName-top-name">{{userList.userName?userList.userName:'未认证'}}</span>
	                <text >
						<i class="approve"  v-if="status==0" data-url="../identity/identity" catchtap="goto">去认证</i>
						<i class="approve"  v-if="status==1">审核中</i>
						<i class="approve"  v-if="status==2">证</i>
					</text>
	                <span class="userName-top-identity">{{auths.roleCodeExp}}</span>
	              </view>
	                 <view class="userName-bot"  v-if="auths.companyName&&status!=0" catchtap='changeCompany'>
	                <span class="userName-top-company">{{auths.companyName}}</span>
	                <image mode="widthFix"  v-if="auths.companyName&&status!=0" class='companyimg' src="https://aio.manytrader.net/preViewUploadFile/images/btn_switchcompany.png"></image>
	              </view> 
	             </view>
	             <view class='avatar'>
	              <image  v-if="userList==''||JSON.stringify(userList)=='{}'" src='https://aio.manytrader.net/preViewUploadFile/images/icon_default_headportrait@2x.png'></image>
	              <image  v-else src="https://aio.manytrader.net/preViewUploadFile/images/icon-mine-active.png"></image>
	            </view>
	          </view>
	        </view>
	       <view class='buyer'>
	          <image  v-if="userList==''||JSON.stringify(userList)=='{}'&&userList.isBuyer==1" src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_buyer@2x.png'></image>
	        </view>
	        <view class="head-section-content-down"  v-if="userList.userPhone">
	          <image class='phoneimg' src="https://aio.manytrader.net/preViewUploadFile/images/list_icon_phone@2x.png" mode='widthFix'></image>
	          <text>{{userList.userPhone}}</text>
	        </view>
	      </view>
	      <!-- 选项 -->
	      <view class=' options-section'>
			  <view class='item '  @click="gotoDetail('integral/index')" data-web="xszy" v-if="userList!==''||JSON.stringify(userList)!=='{}'&&userList.isBuyer==1">
			      <view class='left'>
			        <image class='icon' src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_integralmall@2x.png' mode='widthFix'></image>
			        <text class='title'>积分商城</text>
			      </view>
			      <view class='right'>
			        <image class='arrow' src='https://aio.manytrader.net/preViewUploadFile/images/icon-arrow-right.png' mode='widthFix'></image>
			      </view>
			    </view>
			      <view class='item' @click="gotoWebView('webview/index')">
			        <view class='left'>
			          <image class='icon' src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_guide@2x.png' mode='widthFix'></image>
			          <text class='title'>新手指引</text>
			        </view>
			        <view class='right'>
			          <image class='arrow' src='https://aio.manytrader.net/preViewUploadFile/images/icon-arrow-right.png' mode='widthFix'></image>
			        </view>
			      </view>
			   <view class='item' @click="gotoDetail('set/index')">
				  <view class='left'>
					<image class='icon' src='https://aio.manytrader.net/preViewUploadFile/images/list_icon_setting@2x.png' mode='widthFix'></image>
					<text class='title'>设置</text>
				  </view>
				  <view class='right'>
					<image class='arrow' src='https://aio.manytrader.net/preViewUploadFile/images/icon-arrow-right.png' mode='widthFix'></image>
				  </view>
				</view>
		   </view>
		  </view>
	</view>
</template>
<script>
import config from '../../utils/config.js'
export default {
	components: {
	},
	data() {
		return {
			userList:'',
			status:"",
			auths:"",
		};
	},
	onLoad() {
		this.getUserInfo()
	},
	methods: {
		gotoDetail(url){
			uni.navigateTo({
			    url: url
			});
		},
		
		gotoWebView(url){
			uni.navigateTo({
				url:url + '?url='+ config.ApiUrl  + '/xszy/index.html'
			});	
		},
			
       //获取用户信息
	   getUserInfo(){
		   // let datas = {"errorCode":"0000","errorMsg":"请求成功","returnObject":
		   // {"access_token":"d9748d0e8abb496dac514df52a86b0aa_763d00032f204df0990354e582d55b56","user":{"qq":null,"unionid":null,"auths":
		   // {"companyCode":"763d00032f204df0990354e582d55b56","userCompanyStatus":"2","companyIdentity":"3",
		   // "userCompanyStatusExp":"已认证","autoHedgeSwitch":"1","companyName":"广州卓业科技有限公司","roleCode":"2",
		   // "companyIdentityExp":"买家与卖家","roleCodeExp":"业务经理","signAutoHedgeProtocol":"1"},"userPhone":"13430319375","userIdentity":"441621199604046412",
		   // "userName":"王老板","isBuyer":"1","allowPricing":"1","userCode":"d9748d0e8abb496dac514df52a86b0aa","userWechat":null,
		   // "openNewsPopup":null,"availableIntegral":"20000","aboutToIntegral":"30000","businessDirection":"3","beenusedIntegral":"0","userEmail":null,"id":2640,"status":"2"}},
		   // "type":null,"requestId":null}
		  let self = this
		   this.$uniRequest.post(this.$api.user_refresh_url, {}).then(function(res) {
			   self.userList = res.data.returnObject
			   if(self.userList.user){
				  if(self.userList.user.status){
					  self.status = self.userList.user.status
				  }
				   if(self.userList.user.auths){
						self.auths = self.userList.user.auths
				   }
			   }
		   }).catch(function(error) {
		       // console.log(error);
		   });
	   }
	}
};
</script>

<style lang="scss">
	page{
		background: #EEEEEE;
	}
.minePage {
	
	 .head-section {
	   padding: 20rpx ;
	   background:#f6f6f6;
	   .tologin{
	     color: #999;
	   }

	 
	  .head-section-content{
	   background:#fff;
	   padding:40rpx 40rpx 0rpx 40rpx;
	   
	   .head-section-content-top{
	     display: flex;
		 .userName{
		   line-height: 60rpx;
		   flex: 1;
		   .userName-top,.userName-bot{
		     display: flex;
		     align-items: center;
		   }
		   .userName-top{
			   .userName-top-name{
			     font-size: 48rpx;
			     font-weight:500;
			   }
		   }
		   .userName-bot{
			   image{
			     margin-left: 12rpx;
			   }
		   }
		   
		   .approve{
		     height: 36rpx;
		     line-height: 36rpx;
		     text-align: center;
		     background: #4d65fd;
		     color: #fff;
		     display: inline-block;
		     margin: 0 12rpx;
		     padding: 0 10rpx;
		   }
		 }
	   }
	 }
		.user {
			.userName{
			  flex: 1;
			}
		}
		.companyimg, .phoneimg {
		  width: 36rpx;
		  height: 36rpx;
		}
		.avatar {
			image {
			  width: 120rpx;
			  height: 120rpx;
			  border-radius: 50%;
			  margin-top: -10rpx;
			  display: flex;
			  padding-left: 30rpx;
			  flex: 1;
			  justify-content:flex-end;
			}
		}
		
	 }

	 .head-section-content-down image{
	   width: 38rpx;
	 }
	 .head-section-content-down{
	   border-top: 2rpx dashed rgb(236, 236, 236); 
	   height: 96rpx;
	   display: flex;
	   align-items: center;
	   padding: 0 20rpx;
	   background: #fff;
	   image{
	     width: 120rpx;
	     height: 120rpx;
	   }
	   text{
	     margin-left: 20rpx;
	   }
	 }

	 .buyer{
	   width: 100%;
	   display: flex;
	   justify-content: flex-end;
	   background: #fff;
	   min-height: 60rpx;
	   image{
	     width: 120rpx;
	     height: 30rpx;
	     padding: 10rpx 40rpx 30rpx 30rpx ;
	   }
	 }

	 
	 /* 选项 */
	 .options-section {
	   background: #fff;
	   padding-left: 30rpx;
	   .item {
	     display: flex;
	     justify-content: space-between;
	     height: 96rpx;
	     border-top: 1px solid #f0f0f0;
	   }
	   .right {
	     display: flex;
	     align-items: center;
	     padding-right: 30rpx;
		 image{
		   height: 30rpx;
		   width: 30rpx;
		 }
	   }
	   .left {
	     display: flex;
	     align-items: center;
		 text {
		   margin-left: 20rpx;
		   font-size: 32rpx;
		   color: #222;
		 }
		 image {
		   width: 36rpx;
		   height: 36rpx;
		 }
	   }
	 }                                                                                                                                                                                                                                                                                          
}

</style>
