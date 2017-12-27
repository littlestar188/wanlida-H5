<template>
	<div>
		<div class="state-content">					
			<p>{{statetext}}</p>
		</div>
		<div class="state-pay">	
			<div id="pay"  v-bind:class="[state==20?'active':'']" @click="jump()">
				<a class="cart">确定</a>
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
	.state-content .imgwrapper.used{
		background:url('/weixin/img/img_use@1x.png') no-repeat center;
		background-size: 100%;
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
</style>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				
				statetext:"",
				buttonText:"",
				state:"",
				leftTime:"",
				createTime:"",
				handleOpenId:"",
				openId:""
				/*time:{
					type:function
				}*/

			}
		},
		methods:{ 
			ready:function(){
				var arr = this.handleHref();
				this.sn = arr[0];
				this.openId = arr[1];

				this.handleOpenId = this.decode(decodeURIComponent(this.openId));
				console.log("statebefore----ready"+this.openId,this.handleOpenId)
				this.orderstatek();
				
			},
			timer:function(){
				
				var time = setInterval(this.orderstate_ask,2000);
				if(this.state == 20){
					this.statetext ="设备解锁成功"
					clearInterval(time);
				}else{
					time;
				}
			},
			orderstatek:function(){
				var that = this;
				console.log("orderstate ask----"+this.openId,this.handleOpenId)
				this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.sn+"&openId="+this.handleOpenId).then(function(response){
					//this.orderState = response.data.data.orderStatus;
					that.leftTime = response.data.data.leftTime;
					that.orderNo =  response.data.data.orderNo;
					that.state = response.data.data.orderStatus;
					that.createTime = response.data.data.createTime;
					this.timer();
					
					console.log(response.data.data.orderStatus,that.state)
				})
			},      
			orderstate_ask:function(){
				var that = this;
				this.$http.get("https://wanlida-test.yunext.com/external/getOrderStatus?sn="+this.sn+"&openId="+this.handleOpenId).then(function(response){
					//this.orderState = response.data.data.orderStatus;
					that.leftTime = response.data.data.leftTime;
					that.orderNo =  response.data.data.orderNo;
					that.state = response.data.data.orderStatus;
					that.createTime = response.data.data.createTime;
					that.stateJudge(that.state);
					console.log(response.data.data.orderStatus,that.state)
				})
			},
			jump:function(){
				//if(this.state == 20){
					console.log("jump----"+this.openId,this.handleOpenId)
					this.$router.push({
	                   	name:'router3',
	                    query:{
	                      sn:this.sn,
	                      openId:decodeURIComponent(this.openId)
	                    },
	                    params:{
	                      orderNo:this.orderNo,		
	                      leftTime:this.leftTime,
	                      createTime:this.createTime,
	                      handleOpenId:this.handleOpenId
	                    }
        			});

				//}
			},
			stateJudge:function(value){

				switch(value){
                   case 0:
	                   this.statetext ="等待支付结果...";
	                   break;
                   case 10:
                  	     this.statetext ="支付成功,向设备发送命令中...";	              	    
	                	break;
	                case -10:
	                    this.statetext ="支付失败,请返回重新下单";
	                    //this.buttonText = "重新支付";
	                   break;
	                case -20:
	                    this.statetext ="设备解锁失败";
	                    //this.buttonText="申请退款";                    
	                   break; 
	                case 20:
	                    this.statetext ="设备解锁成功";
	                   // this.buttonText="确定";	                   	                    	                    
	                   break;      

                }

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
			
			var arr = this.handleHref();
			this.openId = arr[1];
			console.log(this.openId)
			this.ready();


		}
	}
</script>