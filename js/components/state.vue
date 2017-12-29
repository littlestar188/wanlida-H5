<template>
	<div>
		<div class="state-content">			
			<!-- <img v-bind:src="imageSrc" alt="" srcset="/wanlida/img/img_use@2x.png 2x"> -->
			<div class="imgwrapper" v-bind:class="imageClass"></div>
			<p>{{errorContent}}</p>
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
	@media only screen and (-webkit-min-device-pixel-ratio:2),
	only screen and (min--moz-device-pixel-ratio:2),
	only screen and (-o-min-device-pixel-ratio:2/1),
	only screen and (min-device-pixel-ratio:2){
		.state-content .imgwrapper.error{
			background:url('/weixin/img/img_trouble@2x.png') no-repeat center;
			background-size: 100%;
		}
		.state-content .imgwrapper.repair{
			background:url('/weixin/img/img_maintain@2x.png') no-repeat center;
			background-size: 100%;
		}
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3),
	only screen and (min--moz-device-pixel-ratio:3),
	only screen and (-o-min-device-pixel-ratio:3/1),
	only screen and (min-device-pixel-ratio:3){
		.state-content .imgwrapper.error{
			background:url('/weixin/img/img_trouble@3x.png') no-repeat center;
			background-size: 100%;
		}
		.state-content .imgwrapper.repair{
			background:url('/weixin/img/img_maintain@3x.png') no-repeat center;
			background-size: 100%;
		}
	}
</style>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				imageStatus:"",
				status:0,
				url:"",
				openId:"",
				errorContent:""
			}
		},
		computed:{
			imageClass:function(){
				switch(this.$route.params.status){
					case -2:
						this.imageStatus = "used";
						this.errorContent="设备已经被使用";
						break;
					case -1:
						this.imageStatus = "repair";
						this.errorContent="设备离线";
						break;
					case 0	:
						this.$router.push({
		                    name:'router2',
		                    query:{
		                    	sn:this.sn,
	                      		openId:decodeURIComponent(this.openId)
		                    },
		                    params:{
		                        sn:this.sn,
		                        status:response.data.unifyStatus
		                    }
		                });
						break;
					default:
						this.imageStatus = "error";
						this.errorContent="设备故障";
						break;		

				}
				return this.imageStatus
			}
		},
		methods:{
			ready:function(){
				// this.sn = this.$route..sn;
				// this.url = "#/?sn="+this.sn;
				this.status = this.$route.params.status;
				console.log(/*this.sn,*/this.status)
			}/*,
			handleHref:function(){
			
				var href = location.href.split("?");
				var condition = href.slice(1,href.length);

				var cond = condition[0].split("&");
				console.log(cond)

				var arr = [];	
				for(var i=0;i<cond.length;i++){
					var name = cond[i].split("=")[0];
					var value = cond[i].split("=")[1];
					arr.push(value)					
				}
				return arr;					
			}*/
		},
		reload:function(){},
		created:function(){
			var arr = this.$emit("reHandleHrefPart")/*this.handleHref()*/;
			this.openId = arr[1];
			this.ready();

		}
	}
</script>