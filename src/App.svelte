<script lang="ts">
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import Router from 'svelte-spa-router'
    import Navbar from './components/Navbar/Navbar.svelte'
	import routes from './routes'
	import Footer from './components/Footer.svelte'

	let isMount = false
	onMount(() => isMount = true)
</script>

{#if isMount}
	<div
		id="app"
		transition:fly={{ y: -70, duration: 1500 }}>
		<Navbar />
		<Router {routes} />
		<Footer />
	</div>
{/if}