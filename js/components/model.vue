<template>
	<div class="content">
		<p>请选择一款模式</p>
		<ul class="modal-choice">
			<li class="modal-item" v-for="(o,eq) in $store.state.model" v-bind:class="[(linum==eq)?'active':'']" @click="modalchose(o,eq)" >
				<div class="modal-desc" >
					<i class="icon" @click="chose(o,eq)" v-bind:class="[(linum==eq)?'icon-selected':'icon-unselected']">
						<!-- <img :src="selectedIcon_1" alt="" :srcset="selectedIcon_2"> -->
					</i>
					<div class="desc-text">	
						<p class="modal" v-bind:class="'modal_'+eq">{{o.name}}</p>
						<p>{{o.desc}}</p>
						<div v-show="o.expensesList && o.expensesList.length>0">
							<ul class="time-choice" v-bind:class="[(linum==1)?'active':'']">
								<li class="time-modal"  v-for="(d,index) in o.expensesList"  @click="expenseChose(d,eq,index)" v-bind:class="[(expenseNum==index && linum==1)?'active':'']">
									<span class="tnum">{{d.type}}</span>小时
									<span class="amount" v-show="linum!==1"><span class="price-flag">￥</span><span class="price">3</span></span>								
									<span class="amount" v-show="(expenseNum==index&& linum==1)"><span class="price-flag">￥</span><span class="price">{{d.amount}}</span></span>
							    </li>								
							</ul>
						</div>
					</div>					
				</div>
				<div class="modal-price">
					<span class="price-flag" v-show="!o.expensesList">￥</span><span class="price">{{o.amount}}</span>					
				</div>
			</li>
			
		</ul>
		<p>选择：{{modalSelected}}<span v-show="linum==1">{{expenseType}}小时</span></p>
		<div class="state-pay">		
			<div id="pay"  v-bind:class="[$store.state.status==0||this.$route.params.increase?'active':'']" @click="createOrder()">
				<a class="cart">立即支付</a>
			</div>
		</div>
		<!-- <div>{{openId}}</div> -->			
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				sn:"",
				openId:"",
				deviceUId:"",
				modalActive:false,
				modalSelected:"全租模式",
				linum:0,
				expenseNum:0,			
				type:"sum",
				expenseType:"3",
				orderNo:"",
				increase:false,
				openId:""
			}
		},
		computed:{
			opendId:function(){				
				return $store.state.openId
			}
		},
		methods:{
			chose:function(value,eq){
				this.linum = eq;
				this.modalSelected = value.name;
				
			},
			expenseChose:function(value,eq,index){
				console.log(eq,index)
				if(eq !== 1) return;
				this.expenseNum = index;
				this.type = value.type||"3";
				this.expenseType = this.type;
				/*this.selected = e.target.className;
				console.log("expensechose--------",this.selected )*/
			},
			modalchose:function(value,eq){
				if(eq == 1 ) return	;	
				this.type ="sum";		
				console.log("modalchose--------",value,this.type)
				//console.log("modalchose------",e,dom,classname)
			},
			createOrder:function(){
				var that = this;
				console.log("modal---"+this.sn,this.openId)
				this.$http.post("https://wanlida-test.yunext.com/external/getOrder",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				 params:{
						"sn":/*'0095699FA99C'*/that.sn,
						"openId":this.$emit("refreshURIcode",decodeURIComponent(that.openId))/*that.decode(decodeURIComponent(that.openId))*/,
						"type":that.type,
						"increase":(this.$route.params.increase)?true:that.increase}
					}).then(function(response){
						
						if(response.data.status ==10000){
							
							that.orderNo = response.data.data
							that.pay(that.orderNo)
								
						}else{
							alert(response.data.msg);
						}
						console.log(that.orderNo)					
					})	
			},
			pay:function(orderNo){
				var that = this;
				this.$http.post("https://wanlida-test.yunext.com/external/payOrder/wxPay",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'}, params:{
						"orderNo":this.orderNo,
						"body":"租赁万利达空净"}
					}).then(function(response){
						//window.location = response.data;

						/*this.$router.push({
	                    	name:'router2',
	                    	params:{
	                    		sn:this.sn
	                    	}
			            }) ;*/
			           if(response.data.status==10000){
			            	var data = response.data.data;
			            	console.log(data.appId)
			            		that.weixinpay(data.appId,data.nonceStr,data.package,data.paySign,data.signType,data.timeStamp);
			            		/*if (typeof WeixinJSBridge == "undefined"){
			            		    if( document.addEventListener ){
			            		        document.addEventListener('WeixinJSBridgeReady', this.weixinpay, false);
			            		    }else if (document.attachEvent){
			            		        document.attachEvent('WeixinJSBridgeReady', this.weixinpay); 
			            		        document.attachEvent('onWeixinJSBridgeReady', this.weixinpay);
			            		    }
			            		}else{
			            		    this.weixinpay();
			            		} 	*/
			            }else{
			            	alert(response.data.msg);	
			            }

				})
			           
			},
			weixinpay:function(appId,nonceStr,package,paySign,signType,timeStamp){
				var that = this;
				WeixinJSBridge.invoke(
        		'getBrandWCPayRequest', {
            	"appId":appId,     //公众号名称，由商户传入     
            	"timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
            	"nonceStr":nonceStr, //随机串     
            	"package":package,     
            	"signType":signType,         //微信签名方式：     
            	"paySign":paySign //微信签名 
       			 },function(res){     
           			 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
           			 	/*this.$router.push({
	                    	name:'router2',
	                    	query:{
	                    		sn:this.sn,
	                    		opendId:this.openId
	                    	}
			            }) */
			            window.location = "https://wanlida-test.yunext.com/weixin/index.html#/statebefore?sn="+that.sn+"&openId="+that.openId;
           			 } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			    });  
			
			}/*,
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
			}*//*,
			encode :function (input) {
			        var output = "";
			        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			        var i = 0;
			        input = _utf8_encode(input);
			        while (i < input.length) {
			            chr1 = input.charCodeAt(i++);
			            chr2 = input.charCodeAt(i++);
			            chr3 = input.charCodeAt(i++);
			            enc1 = chr1 >> 2;
			            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			            enc4 = chr3 & 63;
			            if (isNaN(chr2)) {
			                enc3 = enc4 = 64;
			            } else if (isNaN(chr3)) {
			                enc4 = 64;
			            }
			            output = output +
			            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			        }
			        return output;
			},
			_utf8_encode:function (string) {
			      string = string.replace(/\r\n/g,"\n");
			      var utftext = "";
			      for (var n = 0; n < string.length; n++) {
			          var c = string.charCodeAt(n);
			          if (c < 128) {
			              utftext += String.fromCharCode(c);
			          } else if((c > 127) && (c < 2048)) {
			              utftext += String.fromCharCode((c >> 6) | 192);
			              utftext += String.fromCharCode((c & 63) | 128);
			          } else {
			              utftext += String.fromCharCode((c >> 12) | 224);
			              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			              utftext += String.fromCharCode((c & 63) | 128);
			          }
			
			      }
			      return utftext;
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
			//this.createUid();
			var arr = this.$emit("reHandleHrefPart")/*this.handleHref()*/;
			this.sn = arr[0];
			this.openId = arr[1];
			console.log("moal---"+ this.openId)
		}

	}
</script>
<style>
	.modal-choice{
		overflow: hidden;
		/* padding: 0.3rem  0; */
		padding-top:0.3rem;
	}
	.modal-choice .modal-item{
		display:flex;
		position:relative;
		align-items: center;
		margin-bottom:0.3rem;
/* 		height:2rem;
line-height:2rem; */
		padding:0.5rem 0.6rem;
		background-color:rgba(255,255,255,0.4);

        
	}
	.modal-choice .modal-item.active{
		background-color:rgba(255,255,255,1);
	}
	.modal-choice .modal-item .modal-desc{
		flex:8;
		display: flex;
		align-items: center;
		margin-left:0.5rem;
		border-right:2px solid #E6E6E6;
	}
	.modal-choice .modal-item .modal-desc p{
		padding-left:0.5rem;
	}
	.modal-choice .modal-item .modal-desc .icon{
		height:20px;
		width:20px;
	}
	.modal-choice .modal-item .modal-desc .icon.icon-unselected{
		background:url('/weixin/img/pattern_btn_n@1x.png') no-repeat center;
		background-size: 100%;
	}
	.modal-choice .modal-item .modal-desc .icon.icon-selected{
		background:url('/weixin/img/pattern_btn_s@1x.png') no-repeat center;
		background-size: 100%;
	}
	@media only screen and (-webkit-min-device-pixel-ratio:2),
	only screen and (min--moz-device-pixel-ratio:2),
	only screen and (-o-min-device-pixel-ratio:2/1),
	only screen and (min-device-pixel-ratio:2){
		.modal-choice .modal-item .modal-desc .icon.icon-unselected{
			background:url('/weixin/img/pattern_btn_n@2x.png') no-repeat center;
			background-size: 100%;
		}
		.modal-choice .modal-item .modal-desc .icon.icon-selected{
			background:url('/weixin/img/pattern_btn_s@2x.png') no-repeat center;
			background-size: 100%;
		}
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3),
	only screen and (min--moz-device-pixel-ratio:3),
	only screen and (-o-min-device-pixel-ratio:3/1),
	only screen and (min-device-pixel-ratio:3){
		.modal-choice .modal-item .modal-desc .icon.icon-unselected{
			background:url('/weixin/img/pattern_btn_n@3x.png') no-repeat center;
			background-size: 100%;
		}
		.modal-choice .modal-item .modal-desc .icon.icon-selected{
			background:url('/weixin/img/pattern_btn_s@3x.png') no-repeat center;
			background-size: 100%;
		}
	}
	.modal-choice .modal-item .modal-desc .modal{
		font-size:0.685rem;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_0{
		color:#FF4C50;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_1{
		color:#F5A623;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_2{
		color:#7ED321;
	}
	.modal-price{
		flex:2;
		color:#FF4C50;
		text-align:center;
	}
	.modal-price .price-flag,
	.time-choice.time-modal .amount .price-flag
	.time-choice.active .time-modal .amount .price-flag{
		font-size:0.465rem;
	}
	.modal-price .price,
	.time-choice .time-modal .amount .price,
	.time-choice.active .time-modal .amount .price{
		font-size:0.9rem;
		font-weight: bold;
	}
	.modal-price .price.free{
		font-size:0.765rem;
	}
	.time-choice{
		overflow: hidden;
		font-size:0.465rem;
		color:#D9D9D9;
	}
	.time-choice .time-modal{
		float:left;
		font-size: 0.465rem;
		border: 1px solid;
        padding: 0.2rem 0.4rem;
        border-radius: 0.7rem;
        margin-right:0.5rem;
	}
	.time-choice .time-modal:first-child{
		background-color:#D9D9D9;
		color:#fff;
	}
	.time-choice.active .time-modal{
		border-color:#F5A623;
		color:#F5A623;
		background-color:#fff;
	}
	.time-choice.active .time-modal.active{
		background-color:#F5A623;
		border-color:#F5A623;
		color:#fff;
	}
	.time-choice .time-modal .tnum{
		font-size:0.675rem;
	}
	.time-choice .time-modal .amount{
		color:#FF4C50;
		text-align:center;
		position: absolute;
	    top: 50%;
	    margin-top: -0.5rem;
	    left:84%;
	}
	.time-choice.active .time-modal .amount{
		color:#FF4C50;
		text-align:center;
		position: absolute;
	    top: 50%;
	    margin-top: -0.5rem;
	    left:84%;
	}
	#pay.active{
		background-color: #E60012 !important;
	}
</style>

<!-- <li class="modal-item active" v-for="o in $store.model">
				<div class="modal-desc">
					<i class="icon icon-selected">
						<img src="/wanlida/img/pattern_btn_s@1x.png" alt="" srcset="/wanlida/img/pattern_btn_s@2x.png 2x">
					</i>
					<div class="desc-text">	
						<p class="modal modal_1">全租模式</p>
						<p>文字说明，解释规则</p>
					</div>					
				</div>
				<div class="modal-price">
					<span class="price-flag">￥</span><span class="price">{{$store.state.sum}}</span>
				</div>
			</li>
			<li class="modal-item">
				<div class="modal-desc">
					<i class="icon icon-selected">
						<img src="/wanlida/img/pattern_btn_n@1x.png" alt="" srcset="/wanlida/img/pattern_btn_n@2x.png 2x">
					</i>
					<div class="desc-text">	
						<p class="modal modal_2">分时租赁模式</p>
						<p>文字说明，解释规则</p>
						<p>
							<ul class="time-choice active">
								<li class="time-modal"  v-for="(d,eq) in $store.state.list">
									<span class="tnum">{{d.type}}</span>小时
							    </li>
								<li class="time-modal active">
									<span class="tnum">5</span>小时
								</li>
								<li class="time-modal">
									<span class="tnum">8</span>小时
								</li>
							</ul>
						</p>
					</div>					
				</div>
				<div class="modal-price">
					<span class="price-flag">￥</span><span class="price"></span>
				</div>
			</li>
			<li class="modal-item" v-show="$store.state.free">
				<div class="modal-desc">
					<i class="icon icon-selected">
						<img src="/wanlida/img/pattern_btn_n@1x.png" alt="" srcset="/wanlida/img/pattern_btn_n@2x.png 2x">
					</i>
					<div class="desc-text">	
						<p class="modal modal_3">免费模式</p>
						<p>文字说明，解释规则</p>
					</div>					
				</div>
				<div class="modal-price">
					<span class="price free">免费</span>
				</div>
			</li> -->