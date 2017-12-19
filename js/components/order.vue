<template>
	
	<div class="order-content">			
		<div class="timing">
			<div class="clock danger">{{timeContent}}</div><!-- 04:56:32 -->
			<small>剩余时间</small>
		</div>
		<div class="order-info">
			<span class="red-line"></span>
			<p>订单号：{{orderNo}}</p>
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
				sn:"",
				openId:"",
				orderNo:"",
				//orderState:"",
				timeContent:""
			}
		},

		methods:{
			renew:function(){
				this.$router.push({
	            	name:"router3",
	            	query:{
	                	sn:this.$route.params.sn,
	                	openId:this.$route.params.openId
	            	}
	            });
            },
            /*orderstate:function(sn,openId){
            	this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+sn+"&openId="+openId).then(function(response){
					console.log(response.data)
					this.orderNo = response.data.data.orderNo;
					//this.orderState = response.data.data.orderStatus;
					//this.stateJudge(response.data.data.orderStatus)
				})
            },
			orderstate_ask:function(sn,openId){
				this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+sn+"&openId="+openId).then(function(response){
					//this.orderState = response.data.data.orderStatus;
					//this.stateJudge(response.data.data.orderStatus);
					console.log(response.data.data.orderStatus)
				})
			},*/
			countDown:function(){
				timestamp = $this.$route.params.leftTime;
				var self = this;
				var timer = setInterval(handle,1000);
		       		        
				var handle = function(){
					var self = this;
					var nowTime = new Date();
			        var endTime = new Date(timestamp * 1000);
			        var t = endTime.getTime() - nowTime.getTime();
			        if(t>0){
			         // var day = Math.floor(t/86400000);
			          var hour=Math.floor((t/3600000)%24);
			          var min=Math.floor((t/60000)%60);
			          var sec=Math.floor((t/1000)%60);
			          hour = hour < 10 ? "0" + hour : hour;
			          min = min < 10 ? "0" + min :min;
			          sec = sec < 10 ? "0" + sec: sec;
			          var format = '';
			          
			          if( hour > 0 ){
			            format = hour+"小时"+min+"分"+sec+"秒"; 
			          }
			          if(day <= 0 && hour <= 0){
			            format =min+"分"+sec+"秒";
			          }
			          self.timeContent = format;
			          console.log(self.timeContent)
			          }else{
				           clearInterval(timer);
				           /*self.timeContent = self.endText;
				           self.timeContent = self.endText;*/
				           //self._callback();
				          }
				    }      
			},		
			/*handleHref:function(){
			
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

			}*/
		},	
		created:function(){
			//this.sn=$this.$route.params.sn;
			
			/*var arr = this.handleHref();
			this.sn = arr[0];
			this.openId = this.decode(decodeURIComponent(arr[1]));*/
			//setInterval(this.orderstate_ask(this.sn,this.openId),5000)
			//this.orderstate(this.sn,this.openId);

			//this.countDown(6000);

		}
	}
</script>