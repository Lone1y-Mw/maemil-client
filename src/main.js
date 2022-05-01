import App from './App.svelte';
import Toggle from './Toggle.svelte'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;