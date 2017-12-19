<template>
	<div>
		<div class="state-content">			
			<!-- <img v-bind:src="imageSrc" alt="" srcset="/wanlida/img/img_use@2x.png 2x"> -->
			<div class="imgwrapper" v-bind:class="imageClass"></div>
			<p>设备已经被使用</p>
		</div>
		<p>选择：无模式</p>
		<div class="state-pay">		
			<div id="pay">
				<a class="cart">立即支付</a>
			</div>
		</div>
	</div>
</template>
<style>
	.state-content{
		text-align: center;
    	padding: 1.2rem;
    	margin-bottom:0.2rem;
    	background-color: #fff;
		
	}
	.state-content .imgwrapper{
		height:198px;
		width:198px;
		display:inline-block;
	}
	.state-content .imgwrapper.used{
		background:url('/weixin/img/img_use@1x.png') no-repeat center;
		background-size: 100%;
	}
	.state-content .imgwrapper.error{
		background:url('/weixin/img/img_trouble@1x.png') no-repeat center;
		background-size: 100%;
	}
	.state-content .imgwrapper.repair{
		background:url('/weixin/img/img_maintain@1x.png') no-repeat center;
		background-size: 100%;
	}
	.state-content p{
		padding:0.5rem 0;
		color:#9B9B9B;
	}
</style>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				imageStatus:"",
				status:0,
				url:""
			}
		},
		computed:{
			imageClass:function(){
				switch(this.$route.params.status){
					case -2:
						this.imageStatus = "used";
						break;
					case -1:
						this.imageStatus = "repair";
						break;
					case 0	:
						break;
					default:
						this.imageStatus = "error";
						break;		

				}
				return this.imageStatus
			}
		},
		methods:{
			ready:function(){
				this.sn = this.$route.params.sn;
				this.url = "#/?sn="+this.sn;
				this.status = this.$route.params.status;
				console.log(this.sn,this.status)
			}
		},
		created:function(){
			this.ready();
		}
	}
</script>