<template>
	<div class="device">
		<div class="header">
			<div class="header-left logo left">
				<img src="/wanlida/img/icon_logo@1x.png" alt="" srcset="/wanlida/img/icon_logo@2x.png 2x" >
			</div>
			<div class="header-right left">
				<p class="title">空气净化器KJ-581D</p>
				<small>SN:16SAPEG0020C</small>
			</div>
			<div class="clear"></div>
		</div>

		<div class="radius">
			
		</div>

		<div class="info">
			<div class="info-base left">
				<div class="device-state item">
					<i class="icon icon-device">
						<img src="/wanlida/img/icon_condition@1x.png" alt="" srcset="/wanlida/img/icon_condition@2x.png 2x">
					</i>
					<span>设备当前状态：</span><span class="state-value normal">正常</span>
				</div>
				<div class="device-state item">
					<i class="icon icon-location">
						<img src="/wanlida/img/icon_place@1x.png" alt="" srcset="/wanlida/img/icon_place@2x.png 2x">
					</i>
					<span>漳州百香远山酒店</span>
				</div>
			</div>
			<div class="info-PM right">
				<div>当前PM2.5</div>
				<div class="num">270</div>
			</div>
		</div>
	</div>
</template>
<style>
	.device{
		margin-bottom: 0.6rem;
	}
	.device .header{
		height:;
		-width:100%;
		padding:2% 11%;
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
		color: #FF4C50;
		padding-top: 0.4rem;
		text-align: center;
		font-weight:bold;
	}
	.radius{
		height:1.5rem;
		width:100%;
	}
</style>
<script>
	
</script>