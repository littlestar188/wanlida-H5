<template>
	
	<div class="order-content">			
		<div class="timing">
			<div class="clock danger">{{timeContent}}</div><!-- 04:56:32 -->
			<small>剩余时间</small>
		</div>
		<div class="order-info">
			<span class="red-line"></span>
			<p>订单号：{{orderNo}}</p>
			<p>下单时间：{{createTime}}</p>
			
		</div>
		<div class="state-pay">	
			<div id="pay" class="active"  @click="renew()"> <!--v-bind:class="[$store.state.status==0?'active':'']"-->
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
		width:95%;
		margin:0 auto;
	}
	.timing .clock.danger{
		color:#FF4C50;
	}
	.order-content .order-info p{
		text-align: left;
		padding-left:0.5rem;
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
				sn:"",
				openId:"",
				//orderState:"",
				timeContent:"",/*,
				createTime:""*/
				lasttime:0,
				intervalTime:0,//时间校验变量，
				current:false	
			}
		},
		computed:{
			orderNo:function(){
				return this.$route.params.orderNo
			},
			createTime:function(){
				return this.$route.params.createTime
			}/*,
			leftTime:function(){
				return this.$route.params.leftTime
			}*/
		},
		methods:{
			init:function(){
				this.lasttime = this.$route.params.leftTime/*50000000*/;				
				this.loopTimer();
				this.loopAsk();
			},
			renew:function(){
				console.log(this.$route.query.openId)
				this.$router.push({
	            	name:"router4",
	            	query:{
	                	sn:this.$route.query.sn,
	                	openId:decodeURIComponent(this.$route.query.openId)
	            	},
	            	params:{
	            		increase:true
	            	}
	            });
            },
           /* countdown:function(){
               var that = this;	
               var leftTimer = function(){
	               	var leftTime = 1513733983914;			
	               	var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
	               	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
	               	var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
	               	
	               	hours = that.checkTime(hours); 
	               	minutes = that.checkTime(minutes); 
	               	seconds = that.checkTime(seconds); 
	               	setInterval("leftTimer("+leftTime+")",1000); 
	               	that.timeContent =  hours+":"+ minutes+":"+seconds;
               }

            },*/
            loopTimer:function(){
            	var that = this;
            	setInterval(function(){
            		that.showTimer();
            		that.lasttime= that.lasttime-1000;
            	},1000); 
            },
            showTimer:function(){
            	var leftTime = this.lasttime;

               	if(leftTime>0){
               		//console.log(leftTime);
               		var hours = parseInt(leftTime / 1000 / 60 / 60  , 10); //计算剩余的小时 
	               	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
	               	var seconds = parseInt(leftTime / 1000 %60,10);//计算剩余的秒数 
	               	hours = this.checkTime(hours); 
	               	minutes = this.checkTime(minutes); 
	               	seconds = this.checkTime(seconds); 
	               	this.timeContent =  hours+":"+ minutes+":"+seconds;
               	}else{
               		this.timeContent =  "00:00:00";
               	}			
               	
            },
            ask_leftTime :function(){
            	var  that = this;
            	this.intervalTime = this.lasttime;
            	console.log(this.$route.params.handleOpenId,this.$route.params.openId) 
            	// var openId = this.$route.params.handleOpenId ||this.$route.params.openId
            	this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.$route.query.sn+"&openId="+this.$route.params.handleOpenId).then(function(response){
            		that.intervalTime = response.data.data.leftTime;
            		that.current = response.data.data.current;
            		//console.log(that.intervalTime)
            	});

            },
            loopAsk:function(){
            	var that = this;
            	setInterval(function(){
            		that.ask_leftTime();
            		console.log(that.intervalTime,that.lasttime)
            		
            		that.lasttime = that.intervalTime;
            		
            	},60000);
            },	
			checkTime:function(i){
				if(i<10) 
				{ 
				 i = "0" + i; 
				} 
				return i; 
			}			
		},
		/*watch:{
	        $route:"init"{
	          handler:function(val,oldVal){
	          	console.log(val,oldVal)
	          	this.init();
	          	this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.$route.query.sn+"&openId="+this.$route.params.handleOpenId).then(function(response){
            		that.intervalTime = response.data.data.leftTime;
            		that.current = response.data.data.current;
            		//console.log(that.intervalTime)
            	});
	          },
	          deep:true
	        }
      	},	*/
		created:function(){
			
			this.init();

		}
	}
</script>