<script>
	import config from './utils/config.js'
	
	export default {

		data(){
			return{
				socket1: null,
				socket2: null,
			}
		},
		methods:{
			setSocket(){
				this.socket1 = uni.connectSocket({
					url: config.WebSocketUrl + '/webSk/md?userCode=92587a2bfe824c0381889ae55a704fcb',
					complete: ()=> {}
				});
				this.socket1.onOpen(()=>{
					uni.$on('socket_md',(data)=>{
						this.socket1.send({
							data: data.data
						})
					})
				})
				this.socket1.onMessage((data)=>{
					uni.$emit('socket_md_cb',{
						res: JSON.parse(data.data)
					})
				}) 
				
				this.socket2 = uni.connectSocket({
					url: config.WebSocketUrl + '/webSk/service',
					complete: ()=> {}
				});
				this.socket2.onOpen(()=>{
					this.socket2.send({
						data: JSON.stringify(
						{"action":"getInfoCount","access_token":"92587a2bfe824c0381889ae55a704fcb_763d00032f204df0990354e582d55b56"}
						)
					})
				}) 
				this.socket2.onMessage((data)=>{
					// console.log(data.data)
				})
			},
		},
		mounted(){
			// const el = uni.createSelectorQuery()
			// console.log(el)  
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.setSocket()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import "./common/uni.css";
    @import "./common/base.css";
	page{
		background-color: #292929;
	}
</style>
