<template>
	<div>
		<div class="state-content">
			
			<img v-bind:src="imageSrc" alt="" srcset="/wanlida/img/img_use@2x.png 2x">
			<p>设备已经被使用</p>
		</div>
	</div>
</template>
<style>
	.state-content{
		text-align: center;
    	padding: 1.2rem;
    	background-color: #fff;
		
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
				imageSrc:"",
				url:""
			}
		},
		methods:{
			ready:function(){
				this.imageSrc = this.$route.params.imageSrc;
				this.url = "#/?sn="+this.sn;
				console.log(this.sn,this.imageSrc)
			}
		},
		created:function(){
			this.ready();
		}
	}
</script>