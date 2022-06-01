<script lang="ts">
	import Router from 'svelte-spa-router'
    import Navbar from './components/Navbar/Navbar.svelte'
	import routes from './routes'
	import Footer from './components/Footer.svelte'
	import { useMessaging } from '~/firebase/useMessaging'
	
	const { setToken } = useMessaging()

	let showNotificationModal: boolean
	if (Notification.permission === 'granted') {
		setToken()
		showNotificationModal = false
	}
	else if (Notification.permission === 'default') showNotificationModal = true
	else if (Notification.permission === 'denied') showNotificationModal = true
</script>

<div
	id="app">
	{#if showNotificationModal}
		<div class="not-modal">
			<div class="body">
				<div class="title">환영합니다! 🎉</div>
				<div class="desc">
					급식, 시간표 등의 정보를 알림으로 받으시려면
					<span class="highlight">알림 권한을 허용</span>해주세요!
				</div>
				<div
					class="button focus-shadow"
					on:click={() => {
						Notification.requestPermission()
						.then(permission => {
							if (permission === 'granted') setToken()
						})
						showNotificationModal = false
					}}>확인</div>
			</div>
		</div>
	{/if}
	<Navbar />
	<Router {routes} />
	<Footer />
</div>

<style lang="scss">
	.not-modal {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		.body {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 250px;
			border-radius: 10px;
			text-align: center;
			background: white;
			padding: 20px;
			.title {
				font-size: 20px;
				margin-bottom: 30px;
			}
			.desc {
				font-weight: bold;
				margin-bottom: 40px;
				.highlight {
					color: $primary-color-default;
					text-decoration: underline;
				}
			}
			.button {
				padding: 10px;
				background: $primary-color-default;
				color: #fff;
				cursor: pointer;
				font-size: 14px;
				border-radius: 10px;
			}
		}
	}
</style>