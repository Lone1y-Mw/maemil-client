<script lang="ts">
	import { onMount } from 'svelte'
	import { SyncLoader } from 'svelte-loading-spinners'
	import getMeal from '~/functions/getMeal'
	import dayFormatter from '~/functions/dayFormatter'

	let loading: boolean

    let today = new Date()

	let mealList: string[] = [];

	onMount(async () => {
		loading = true
		mealList = await getMeal(dayFormatter(today))
		loading = false
	})

	let dateValue = dayFormatter(today, '-')
</script>


<div class="meal">
	<div class="meal-desc">
		<div class="meal-title">
			<div>급식 🍚</div>
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

<style lang="scss">
	.meal {
		margin: 0 auto 30px;
		width: 250px;
		min-height: 88px;
		height: 100%;
		padding: 25px;
		border-radius: 20px;
		background-color: #fff;
		box-shadow: 1px 1px 7px 2px #d3d3d3;
		.meal-desc {
			margin-bottom: 10px;
			.meal-title {
				font-weight: bold;
				text-align: center;
			}
			.meal-notification {
				display: flex;
			}
		}
		.meal-content {
			margin-bottom: 15px;
			.meal-loader {
				width: 50px;
				height: 50px;
				margin: auto;
			}
			.meal-item {
                margin: 0 0 0 16%;
			}
			.meal-nomeal {
				font-weight: bold;
				color: $text-color-warning;
				text-align: center;
			}
		}
		.meal-selector {
			width: fit-content;
			margin: 0 auto;
		}
	}
</style>