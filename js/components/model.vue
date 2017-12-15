<template>
	<div class="content">
		<p>请选择一款模式</p>
		<ul class="modal-choice">
			<li class="modal-item" v-for="(o,eq) in $store.state.model" v-bind:class="[(linum==eq)?'active':'']">
				<div class="modal-desc" >
					<i class="icon icon-selected" @click="chose(o,eq)">
						<img src="/wanlida/img/pattern_btn_n@1x.png" alt="" srcset="/wanlida/img/pattern_btn_n@2x.png 2x">
					</i>
					<div class="desc-text">	
						<p class="modal" v-bind:class="">{{o.name}}</p>
						<p>{{o.desc}}</p>
						<p v-show="o.expensesList && o.expensesList.length>0">
							<ul class="time-choice" v-bind:class="[(linum==2)?'active':'']">
								<li class="time-modal"  v-for="(d,eq,index) in o.expensesList" @click="expenseChose(d,index)" v-bind:class="[(expenseNum==index)?'active':'']">
									<span class="tnum">{{d.type}}</span>小时
									<span class="amount"><span class="price-flag">￥</span><span class="price">{{d.amount}}</span></span>
							    </li>
								<!-- <li class="time-modal active">
									<span class="tnum">5</span>小时
								</li>
								<li class="time-modal">
									<span class="tnum">8</span>小时
								</li> -->
							</ul>
						</p>
					</div>					
				</div>
				<div class="modal-price">
					<span class="price-flag" v-show="!o.expensesList">￥</span><span class="price">{{o.amount}}</span>					
				</div>
			</li>
			
		</ul>
		<p>选择：无模式</p>		
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return {
				modalActive:false,
				modalColor:"",
				linum:0,
				expenseNum:0,
				selectedIcon:""
			}
		},
		methods:{
			chose:function(value,eq){
				this.linum = eq;
				if(qe == 1){
					this.expenseChose()
				}
			},
			expenseChose:function(value,index){
				this.expenseNum = index;
			}
		}
	}
</script>
<style>
	.modal-choice{
		overflow: hidden;
		padding: 0.3rem  0;
	}
	.modal-choice .modal-item{
		display:flex;
		position:relative;
		align-items: center;
		margin-bottom:0.3rem;
/* 		height:2rem;
line-height:2rem; */
		padding:0.5rem 0.6rem;
		background-color:rgba(255,255,255,0.6);

        
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
	}
	.modal-choice .modal-item .modal-desc .modal{
		font-size:0.685rem;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_1{
		color:#FF4C50;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_2{
		color:#F5A623;
	}
	.modal-choice .modal-item .modal-desc .modal.modal_3{
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
        padding: 0 0.4rem;
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