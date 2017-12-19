<template>
	<div class="device">
		<div class="header">
			<div class="header-left logo left">
				<img src="/weixin/img/icon_logo@1x.png" alt="" srcset="/weixin/img/icon_logo@2x.png 2x" >
			</div>
			<div class="header-right left">
				<div class="title">空气净化器KJ-581D</div>
				<small>SN:{{headerdata.sn}}</small>
				<small></small>
			</div>
			<div class="clear"></div>
		</div>

		<div class="radius">
			<img src="/weixin/img/top_bg@1x.png" alt="" srcset="/weixin/img/top_bg@2x.png 2x">
		</div>

		<div class="info">
			<div class="info-base left">
				<div class="device-state item">
					<i class="icon icon-device">
						<img src="/weixin/img/icon_condition@1x.png" alt="" srcset="/weixin/img/icon_condition@2x.png 2x">
					</i>
					<span>设备当前状态：</span><span class="state-value" v-bind:class="fontStyle">{{headerdata.unifyStatus|statusfilter}}</span>
				</div>
				<div class="device-state item">
					<i class="icon icon-location">
						<img src="/weixin/img/icon_place@1x.png" alt="" srcset="/weixin/img/icon_place@2x.png 2x">
					</i>
					<span>{{headerdata.province}}{{headerdata.city}}{{headerdata.district}}{{headerdata.address}}</span>
				</div>
			</div>
			<div class="info-PM right">
				<div>当前PM2.5</div>
				<div class="num" v-bind:class="numStyle">{{headerdata.pm}}</div>
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
	module.exports = {
		props:['message'],
		data:function(){
			return{
				status:0,
				pmnum:99
			}
		},
		computed:{
			headerdata:function(){
				return this.message
			},
			fontStyle:function(){
				return {
					"normal":this.status==0,
					"alarm":this.status==-1||this.status==-2,
					"danger":this.status==1||this.status==2||this.status==3||this.status==4
				}
			},
			numStyle:function(){
					return {
					"normal":(this.pnum ==100||this.pmnum<100) && this.pmnum>0,
					"alarm":this.pmnum>100 && (this.pmnum<150 || this.pmnum ==150),
					"danger":this.pmnum>150
				}
			}
		},
		filters:{
			statusfilter:function(value){
				var result = "";
				switch(value){
					case -2:
						result = "设备使用中";
						break;
					case -1:
						result = "离线";
						break;
					case 0:
						result = "正常";
						status = 0;
						break;
					case 1:
						result ="pm2.5 故障";
						break;
					case 2:
						result ="光净化故障";
						break;	
					case 3:
						result ="风机故障";
						break;
					case 4:
						result ="缺水故障";
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
		/* padding:2% 11%;
		padding-top:4%; */
		padding:0.2rem 2rem;
		padding-top:0.4rem;
		background-color:#E60012;
		color:#fff;
	}
	.device .header .header-left{
		/* padding: 2% 3%; */
		padding:0.3rem;
	}
	.device .header .title{
		font-size:18px;
	}
	.device .info{
		/* padding:4% 11%; */
		padding:0.3rem 1rem;
		padding-bottom:0.2rem;
		overflow: hidden;
		background-color:#fff;
		display:flex;
	}
	.device .info-base.left{
		flex:8;
	}
	.device .info-PM.right{
		flex:3;
	}
	.device .info-base .item{
		padding-bottom:0.2rem;
	}
	.state-value{
        font-size: 0.625rem;    
	}
	.num{
		font-size: 0.775rem;
		padding-top: 0.2rem;
		text-align: center;
		font-weight:bold;
	}
	.num.normal,.state-value.normal{
		color: #7ED321;
		/*小于100*/
	}
	.num.alarm,.state-value.alarm{
		color: #F5A623;
		/*101-150*/
	}
	.num.danger,.state-value.danger{
		color: #FF4C50;
		/*>150*/
	}
	.radius{
		position: relative;
    	top: 0;
		height:0.8rem;
		width:100%;  	
    	background: #fff;
	}
	.radius>img{
		position: absolute;
		width:100%;
    	top: 0;
	}
</style>
