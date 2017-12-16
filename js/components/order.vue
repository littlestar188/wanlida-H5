<template>
	
	<div class="order-content">			
		<div class="timing">
			<div class="clock danger">04:56:32</div>
			<small>剩余时间</small>
		</div>
		<div class="order-info">
			<span class="red-line"></span>
			<p>订单号：1003749939411840</p>
			<p>下单时间：2017-11-9  18:04</p>
			
		</div>
		<div class="state-pay">		
			<div id="pay"  v-bind:class="[$store.state.status==0?'active':'']" @click="renew()">
				<a class="cart">续费</a>
			</div>
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
	.timing .clock.danger{
		color:#FF4C50;
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
		methods:{
			renew:function(){
				this.$router.push({
	            	name:'router3',
	            	params:{
	                	
	            	}
	            }) ;
            } 
		}
	}
</script>