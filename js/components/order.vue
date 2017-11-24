<template>
	
	<div class="order-content">			
		<div class="timing">
			<div class="clock">04:56:32</div>
			<small>剩余时间</small>
		</div>
		<div class="order-info">
			<span class="red-line"></span>
			<p>订单号：1003749939411840</p>
			<p>下单时间：2017-11-9  18:04</p>
			
		</div>
	</div>
	
</template>
<style>
    .order-content{
		text-align: center;		
	}
    .order-content .timing,
	.order-content .order-info{
		background-color: #fff;
		margin-bottom:0.6rem;
		padding: 0.6rem 0;
	}
	.timing p{
		padding-left:0;
	}
	.timing>small{
		color:#9B9B9B;
	}
	.timing .clock{
		color:#72BA16;
		font-size:2rem;
		font-weight: normal;
	}
	.order-content .order-info{
		position: relative;
		width:90%;
		margin:0 auto;
	}
	.order-content .order-info p{
		text-align: left;
	}
	.order-content .order-info .red-line{
		position: absolute;
	    display: block;
	    width: 0.2rem;
	    height: 50%;
	    top: 50%;
	    margin-top: -5.8%;
	    background-color: #E60012;
	}
	
</style>
<script type="text/javascript">
	module.exports = {

	}
</script>