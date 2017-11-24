<template>
	<div>
		<div class="content">
			<p>请选择一款模式</p>
			<ul class="modal-choice">
				<li class="modal-item active">
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
						<span class="price-flag">￥</span><span class="price">20</span>
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
								<ul class="time-choice">
									<li class="time-modal active">
										<span class="tnum">3</span>小时
								    </li>
									<li class="time-modal">
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
						<span class="price-flag">￥</span><span class="price">10</span>
					</div>
				</li>
				<li class="modal-item">
					<div class="modal-desc">
						<i class="icon icon-selected">
							<img src="/wanlida/img/pattern_btn_n@1x.png" alt="" srcset="/wanlida/img/pattern_btn_n@2x.png 2x">
						</i>
						<div class="desc-text">	
							<p class="modal modal_3">节日免费模式</p>
							<p>文字说明，解释规则</p>
						</div>					
					</div>
					<div class="modal-price">
						<span class="price free">免费</span>
					</div>
				</li>
			</ul>
			
		</div>
		<!-- <p>选择：全租模式</p> -->
		<!-- <div id="pay">
			<a class="cart">立即支付</a>
		</div> -->
	</div>
</template>
<style>
	.modal-choice{
		overflow: hidden;
		padding: 0.3rem  0;
	}
	.modal-choice .modal-item{
		display:flex;
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
	.modal-price .price-flag{
		font-size:0.465rem;
	}
	.modal-price .price{
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
	.time-choice .time-modal.active{
		background-color:#D9D9D9;
		color:#fff;
	}
	.time-choice .time-modal .tnum{
		font-size:0.675rem;
	}
</style>
<script type="text/javascript">
	module.exports = {

	}
</script>