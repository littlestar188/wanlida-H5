<template>
	<div class="device">
		<div class="header">
			<div class="header-left logo left">
				<img src="/wanlida/img/icon_logo@1x.png" alt="" srcset="/wanlida/img/icon_logo@2x.png 2x" >
			</div>
			<div class="header-right left">
				<div class="title">空气净化器KJ-581D</div>
				<small>SN:{{headerdata.sn}}</small>
				<small></small>
			</div>
			<div class="clear"></div>
		</div>

		<div class="radius">
			<img src="/wanlida/img/top_bg@1x.png" alt="" srcset="/wanlida/img/top_bg@2x.png 2x">
		</div>

		<div class="info">
			<div class="info-base left">
				<div class="device-state item">
					<i class="icon icon-device">
						<img src="/wanlida/img/icon_condition@1x.png" alt="" srcset="/wanlida/img/icon_condition@2x.png 2x">
					</i>
					<span>设备当前状态：</span><span class="state-value normal">{{$store.state.status|statusfilter}}</span>
				</div>
				<div class="device-state item">
					<i class="icon icon-location">
						<img src="/wanlida/img/icon_place@1x.png" alt="" srcset="/wanlida/img/icon_place@2x.png 2x">
					</i>
					<span>{{headerdata.province}}{{headerdata.city}}{{headerdata.district}}{{headerdata.address}}</span>
				</div>
			</div>
			<div class="info-PM right">
				<div>当前PM2.5</div>
				<div class="num danger">{{headerdata.pm}}</div>
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
	module.exports = {
		props:['message'],
		data:function(){
			return {
				
			}
		},
		computed:{
			headerdata:function(){
				return this.message
			}
		},
		filters:{
			statusfilter:function(value){
				var result = "";
				switch(value){
					case -2:
						result = "设备繁忙";
						break;
					case -1:
						result = "离线";
						break;
					case 0:
						result = "正常";
						break;
					default:
						result ="故障";
						break;

				}
				return result;
			}
		}
		
	};
</script>
<style>
	.device{
		margin-bottom: 0.6rem;
	}
	.device .header{
		height:;
		-width:100%;
		padding:2% 11%;
		padding-top:4%;
		background-color:#E60012;
		color:#fff;
	}
	.device .header .header-left{
		padding: 2% 3%;
	}
	.device .header .title{
		font-size:18px;
	}
	.device .info{
		padding:4% 11%;
		padding-bottom:0;
		overflow: hidden;
		background-color:#fff;
		display:flex;
	}
	.device .info-base.left{
		flex:9;
	}
	.device .info-PM.right{
		flex:3;
	}
	.device .info-base .item{
		padding-bottom:0.6rem;
	}
	.state-value{
        font-size: 0.625rem;    
	}
	.state-value.normal{
		 color: #7ED321;
	}
	.num{
		font-size: 0.775rem;
		padding-top: 0.4rem;
		text-align: center;
		font-weight:bold;
	}
	.num.normal{
		color: #7ED321;
		/*小于100*/
	}
	.num.alarm{
		color: #F5A623;
		/*101-150*/
	}
	.num.danger{
		color: #FF4C50;
		/*>150*/
	}
	.radius{
		position: relative;
    	top: 0;
		height:1.2rem;
		width:100%;  	
    	background: #fff;
	}
	.radius>img{
		position: absolute;
    	top: 0;
	}
</style>
