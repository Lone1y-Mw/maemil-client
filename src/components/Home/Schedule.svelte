<script lang="ts">
    import { onMount } from 'svelte';
    import getSchedule from '~/functions/getSchedule'
    import { SyncLoader } from 'svelte-loading-spinners'
	import dayFormatter from '~/functions/dayFormatter'

    let isMount: boolean = false
    onMount(() => isMount = true)

    let loading: boolean

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1

    let scheduleList: any[] = []

    $: (async () => {
        if(isMount) {
            loading = true
            let schedule = document.getElementsByClassName('schedule')[0]
            let tailDate = getTailDate(new Date(year, month - 1))
            scheduleList = await getSchedule(tailDate.startDay, tailDate.endDay)
            loading = false
        }
    })() || month

    function YMD2prettyMD(ymd: string) {
        return [ymd.slice(4, 6), '.', ymd.slice(6, 8)].join('')
    }

    function getTailDate(dateToday: Date) {
        const startDay = dayFormatter(new Date(
            dateToday.getFullYear(),
            dateToday.getMonth(),
            1
        ))
        const endDay = dayFormatter(new Date(
            dateToday.getFullYear(),
            dateToday.getMonth() + 1,
            0
        ))
        return { startDay, endDay }
    }

	function prevSch() {
        loading = true
        if(month - 1 <= 0) {
            year -= 1
            month += 11
        } else month -= 1
        loading = false
	}

	function nextSch() {
        loading = true
        if(month + 1 > 12) {
            year += 1
            month -= 11
        } else month += 1
        loading = false
	}
</script>

<div class="schedule">
    <div class="schedule-desc">
        <div class="schedule-title">
			<button on:click={prevSch}>&lt;</button>
            <span>{year}년 {month}월 일정 📆</span>
			<button on:click={nextSch}>&gt;</button>
        </div>
    </div>
    <div class="schedule-contents">
        {#if loading}
            <div class="schedule-loader">
                <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
            </div>
            {:else}
                {#each scheduleList as scheduleItem}
                    <div class="schedule-item">
                        <div class="schedule-date">{YMD2prettyMD(scheduleItem.AA_YMD)}</div>
                        <div class="schedule-name">{scheduleItem.EVENT_NM}</div>
                    </div>
                    {:else}
                        <div class="schedule-noschedule">특별한 일정이 없습니다.</div>
                {/each}
        {/if}
    </div>
</div>

<style lang="scss">
    .schedule {
		margin: 0 auto;
        width: 250px;
        min-height: 88px;
        max-height: 235px;
        height: 100%;
        overflow: auto;
		padding: 25px;
		border-radius: 20px;
		box-shadow: 1px 1px 7px 2px #d3d3d3;
        .schedule-desc {
            margin-bottom: 10px;
            .schedule-title {
                font-weight: bold;
                text-align: center;
                button {
                    padding: 3px 5px;
                }
            }
        }
        .schedule-contents {
            .schedule-loader {
                width: 50px;
                height: 50px;
                margin: auto;
            }
            .schedule-item {
                margin: 0 0 0 16%;
                display: flex;
                .schedule-date {
                    margin-right: 10px;
                }
            }
            .schedule-noschedule {
                font-weight: bold;
                color: #d9534f;
                text-align: center;
            }
        }
    }
</style>