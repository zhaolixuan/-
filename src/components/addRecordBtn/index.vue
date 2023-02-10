<template>
	<div class="btn" @click='toAdd'>
		<!-- <h1>+</h1> -->
		<p class='add'>+</p>
		<p class='name'>添加{{name}}</p>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
			},
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			toAdd() {
				this.$emit('toAdd')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		position: fixed;
		bottom: 108upx;
		right: 50upx;
		cursor: pointer;

		.add {
			width: 96upx;
			height: 96upx;
			font-size: 60upx;
			color: #fff;
			background: linear-gradient(174deg, #61ABFF 0%, #3272FF 100%);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.name {
			position: absolute;
			padding: 6upx 15upx;
			background: #F4F8FF;
			border-radius: 100upx;
			font-size: 26upx;
			font-weight: 400;
			color: #2D55EE;
			bottom: -30upx;
			left: 50%;
			transform: translateX(-50%);
			white-space:nowrap;
		}
	}
</style>
