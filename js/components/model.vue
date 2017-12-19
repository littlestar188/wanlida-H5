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
								<li class="time-modal"  v-for="(d,index) in o.expensesList"  @click="expenseChose(d,eq,index)" v-bind:class="[(expenseNum==index)?'active':'']">
									<span class="tnum">{{d.type}}</span>小时								
									<span class="amount" v-if="" v-show="(expenseNum==index)"><span class="price-flag">￥</span><span class="price">{{d.amount}}</span></span>
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
		<p>选择：{{modalSelected}}</p>
		<div class="state-pay">		
			<div id="pay"  v-bind:class="[$store.state.status==0?'active':'']" @click="createOrder()">
				<a class="cart">立即支付</a>
			</div>
		</div>			
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				sn:"",
				deviceUId:"",
				modalActive:false,
				modalSelected:"全租模式",
				linum:0,
				expenseNum:0,
				flagclick:false,
				type:"sum",
				orderNo:"",
				increase:false
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
				this.type = value.type;
				
				
				console.log("expensechose--------",this.flagclick)
			},
			modalchose:function(value,eq){
				
				if(eq == 1){
					this.flagclick = true;
					return
				}else{
					this.flagclick = false;
					this.type ="sum";
				}
				console.log("modalchose--------",value,this.type)
			},
			createUid:function(){
				this.$http.get("https://wanlida-test.yunext.com/external/getUUID")
                    .then(function(response){
                     this.deviceUId = response.data;
                     console.log(this.deviceUId)
                     /*this.setStorage("generateCode",response.data.data);
                     this.judgeStorage("generateCode"); */                    
                });
			},
			createOrder:function(){

				var href = location.href.split("?");
				var condition = href.slice(1,href.length);
				this.sn = condition[0].split("=")[1];

				console.log(this.sn)
				this.$http.post("https://wanlida-test.yunext.com/external/getOrder",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				 params:{
						"sn":/*'0095699FA99C'*/this.sn,
						"uuid":this.deviceUId,
						"type":this.type,
						"increase":this.increase}
					}).then(function(response){
						
						if(response.data.status ==10000){
							
							this.orderNo = response.data
							this.pay(this.orderNo)
								
						}else{
							alert(response.data.msg);
						}
						console.log(this.orderNo)					
					})	
			},
			pay:function(orderNo){
				this.$http.post("https://wanlida-test.yunext.com/external/payOrder/wxPay",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'}, params:{
						"orderNo":this.orderNo,
						"body":"租赁万利达空净"}
					}).then(function(response){
						window.location = response.data;
						/*this.$router.push({
	                    	name:'router2',
	                    	params:{}
			            }) ;*/ 
				})
			}

		},
		created:function(){
			this.createUid();
			

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
		background:url('/wanlida/img/pattern_btn_n@1x.png') no-repeat center;
		background-size: 100%;
	}
	.modal-choice .modal-item .modal-desc .icon.icon-selected{
		background:url('/wanlida/img/pattern_btn_s@1x.png') no-repeat center;
		background-size: 100%;
	}
	@media only screen and (-webkit-min-device-pixel-ratio:2),
	only screen and (min--moz-device-pixel-ratio:2),
	only screen and (-o-min-device-pixel-ratio:2/1),
	only screen and (min-device-pixel-ratio:2){
		.modal-choice .modal-item .modal-desc .icon.icon-unselected{
			background:url('/wanlida/img/pattern_btn_n@2x.png') no-repeat center;
			background-size: 100%;
		}
		.modal-choice .modal-item .modal-desc .icon.icon-selected{
			background:url('/wanlida/img/pattern_btn_s@2x.png') no-repeat center;
			background-size: 100%;
		}
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3),
	only screen and (min--moz-device-pixel-ratio:3),
	only screen and (-o-min-device-pixel-ratio:3/1),
	only screen and (min-device-pixel-ratio:3){
		.modal-choice .modal-item .modal-desc .icon.icon-unselected{
			background:url('/wanlida/img/pattern_btn_n@3x.png') no-repeat center;
			background-size: 100%;
		}
		.modal-choice .modal-item .modal-desc .icon.icon-selected{
			background:url('/wanlida/img/pattern_btn_s@3x.png') no-repeat center;
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