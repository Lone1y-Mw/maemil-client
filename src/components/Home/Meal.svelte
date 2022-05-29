<script lang="ts">
	import { onMount } from 'svelte'
	import getMeal from '~/functions/getMeal'
	import { SyncLoader } from 'svelte-loading-spinners'
	import Toggle from '~/components/Toggle.svelte'
	import dayFormatter from '~/functions/dayFormatter'

    let today = new Date()

	let loading = true
	let mealList: string[] = [];

	onMount(() => {
		(async () => {
			mealList = await getMeal(dayFormatter(today))
			loading = false
		})()
	})

	let dateValue = dayFormatter(today, '-')
</script>


<div class="meal">
	<div class="meal-desc">
		<div class="meal-title">
			<span>급식 🍚</span>
		</div>
	</div>
	<div class="meal-content">
		{#if loading}
			<div class="meal-loader">
				<SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
			</div>
			{:else}
				{#each mealList as mealItem}
					<div class="meal-item">{mealItem}</div>
					{:else}
						<div class="meal-nomeal">급식 정보가 없습니다.</div>
				{/each}
		{/if}
	</div>
	<div class="meal-selector">
		<input
			type="date"
			bind:value={dateValue}
			on:change={async () => {
				loading = true
				mealList = await getMeal(dateValue.replaceAll('-', ''))
				loading = false
			}} />
	</div>
</div>

<style>
	.meal {
		padding: 1.5em;
		border-radius: 40px 40px;
		background-color: white;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
	}

	.meal-desc {
		margin-bottom: 10px;
	}

	.meal-title {
		font-weight: bold;
		text-align: center;
	}

	.meal-content {
		margin-bottom: 15px;
	}

	.meal-loader {
        width: 50px;
        height: 50px;
        margin: auto;
	}

	.meal-item {
		text-indent: 15px;
	}

	.meal-nomeal {
		font-weight: bold;
		color: #d9534f;
		text-align: center;
	}

	.meal-selector {
		width: fit-content;
		margin: 0 auto;
	}
</style>