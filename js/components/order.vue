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
		data:function(){
			return {
				timestamp:"",
				timeInterval:"",//倒计时结束时间与当前时间的之间的间隔
				timeIntervalVal: '', // 保存时间间隔的参数
			}
		},
		methods:{
			renew:function(){
				this.$router.push({
	            	name:'router3',
	            	params:{
	                	
	            	}
	            }) ;
            },
			orderstate_ask:function(){
				this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?orderNo="+this.orderNo).then(function(response){
					console.log(response.data)
				})
			},
			countDown:function(timestamp){
				var self = this;
				var timer = setInterval(function(){
		        var nowTime = new Date();
		        var endTime = new Date(timestamp * 1000);
		        var t = endTime.getTime() - nowTime.getTime();
		        if(t>0){
		         // var day = Math.floor(t/86400000);
		          var hour=Math.floor((t/3600000)%24);
		          var min=Math.floor((t/60000)%60);
		          var sec=Math.floor((t/1000)%60);
		          hour = hour < 10 ? "0" + hour : hour;
		          min = min < 10 ? "0" + min : min;
		          sec = sec < 10 ? "0" + sec : sec;
		          var format = '';
		          /*if(day > 0){
		            format = `${day}天${hour}小时${min}分${sec}秒`;
		          } */
		          if(day <= 0 && hour > 0 ){
		            format = `${hour}小时${min}分${sec}秒`; 
		          }
		          if(day <= 0 && hour <= 0){
		            format =`${min}分${sec}秒`;
		          }
		          self.content = format;
		          }else{
		           clearInterval(timer);
		           self.content = self.endText;
		           self._callback();
		          }
		         },1000);
		        }
		        
			} 
		},
		created:function(){

		}
	}
</script>