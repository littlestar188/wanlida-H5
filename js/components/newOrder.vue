<template>
	
	<div class="order-content">			
		<div class="timing" v-bind:class="[current==false?'newTiming':'']">
			<div class="clock danger">{{timeContent}}</div><!-- 04:56:32 -->
			<small>剩余时间</small>
		</div>
		<div class="order-info" v-show="current">
			<span class="red-line"></span>
			<p>订单号：{{orderNo}}</p>
			<p>下单时间：{{createTime}}</p>
			
		</div>
		<div class="stateWrapper" v-show="!current">
			<div class="imgwrapper used" v-show="!current"></div>
			<div>设备正在使用中...</div>
		</div>
		<div class="state-pay">	
			<div id="pay" v-show="current" v-bind:class="[current==true?'active':'']" @click="renew()"> <!-- v-bind:class="[$store.state.status==0?'active':'']" -->
				<a class="cart">续费</a>
			</div>
		</div>	
	</div>
	
</template>
<style>
	.stateWrapper{
		background-color:#fff;
		padding-bottom:0.5rem;
		color:#9B9B9B;
	}
	.imgwrapper{
		height:198px;
		width:198px;
		display:inline-block;
	}
	.imgwrapper.used{
		background:url('/weixin/img/img_use@1x.png') no-repeat center;
		background-size: 100%;
	}
	@media only screen and (-webkit-min-device-pixel-ratio:2),
	only screen and (min--moz-device-pixel-ratio:2),
	only screen and (-o-min-device-pixel-ratio:2/1),
	only screen and (min-device-pixel-ratio:2){
		.imgwrapper.used{
		background:url('/weixin/img/img_use@2x.png') no-repeat center;
		background-size: 100%;
	}
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3),
	only screen and (min--moz-device-pixel-ratio:3),
	only screen and (-o-min-device-pixel-ratio:3/1),
	only screen and (min-device-pixel-ratio:3){
		.imgwrapper.used{
		background:url('/weixin/img/img_use@3x.png') no-repeat center;
		background-size: 100%;}
	}	
    .order-content{
		text-align: center;		
	}
    .order-content .timing.newTiming{
    	margin-bottom:0;
    }	
</style>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				sn:"",
				openId:"",
				getOpenId:"",
				//orderState:"",
				timeContent:"",/*,
				createTime:""*/
				lasttime:0,
				intervalTime:0,//时间校验变量，
				current:false,
				orderNo:"",
				createTime:""
			}
		},
		methods:{
			init:function(){
				// this.lasttime = this.$route.params.leftTime/*50000000*/;
				console.log(this.$route.params.handleOpenId)
				var arr = this.handleHref();
				this.openId = arr[1];
				this.getOpenId = this.$route.params.handleOpenId||this.decode(decodeURIComponent(this.openId));
				var that= this;
            	this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.$route.query.sn+"&openId="+this.getOpenId).then(function(response){
            		that.intervalTime = response.data.data.leftTime;
            		that.current = response.data.data.current;
            		that.orderNo = response.data.data.orderNo;
            		that.createTime = response.data.data.createTime;
            		that.lasttime = response.data.data.leftTime;
            		//console.log(that.intervalTime)
            	});				
				this.loopTimer();
				this.loopAsk();
			},
			renew:function(){
				console.log(this.$route.query.openId)
				if(this.current){
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
				}
				
            },
          
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
            	console.log(this.$route.params.handleOpenId,this.$route.params.openId,this.getOpenId) 
            	var arr = this.handleHref();
				this.openId = arr[1];
				this.getOpenId = this.$route.params.handleOpenId||this.decode(decodeURIComponent(this.openId));
            	this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.$route.query.sn+"&openId="+this.getOpenId).then(function(response){
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
			},
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
			},
			decode:function(input){
		         // private property
		     	 _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		 
		      	var output = "";
		        var chr1, chr2, chr3;
		        var enc1, enc2, enc3, enc4;
		        var i = 0;
		        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		        while (i < input.length) {
		            enc1 = _keyStr.indexOf(input.charAt(i++));
		            enc2 = _keyStr.indexOf(input.charAt(i++));
		            enc3 = _keyStr.indexOf(input.charAt(i++));
		            enc4 = _keyStr.indexOf(input.charAt(i++));
		            chr1 = (enc1 << 2) | (enc2 >> 4);
		            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		            chr3 = ((enc3 & 3) << 6) | enc4;
		            output = output + String.fromCharCode(chr1);
		            if (enc3 != 64) {
		                output = output + String.fromCharCode(chr2);
		            }
		            if (enc4 != 64) {
		                output = output + String.fromCharCode(chr3);
		            }
		        }
		        output = this._utf8_decode(output);
		        return output;

		    },
		    _utf8_decode:function(utftext){
		      var string = "";
		        var i = 0;
		        var c = c1 = c2 = 0;
		        while ( i < utftext.length ) {
		            c = utftext.charCodeAt(i);
		            if (c < 128) {
		                string += String.fromCharCode(c);
		                i++;
		            } else if((c > 191) && (c < 224)) {
		                c2 = utftext.charCodeAt(i+1);
		                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		                i += 2;
		            } else {
		                c2 = utftext.charCodeAt(i+1);
		                c3 = utftext.charCodeAt(i+2);
		                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		                i += 3;
		            }
		        }
		        return string;
		    }	
		},
		created:function(){
			
			this.init();

		}
	}
</script>