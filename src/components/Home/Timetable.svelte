<script lang="ts">
    import getTimetable from '~/functions/getTimetable'
	import { SyncLoader } from 'svelte-loading-spinners'

    type Grdp = {
        grade?: string;
        group?: string;
    }

    let timetableList: any[][][][]

    let grdpSp = localStorage.getItem('timetable-grdp')?.split('-') || ['1', '1']
    let grade = grdpSp[0]
    let group = grdpSp[1]

    let classes: Grdp[] = []

    let selected = grade + '-' + group

    async function init() {
        timetableList = await getTimetable()
    
        for(let grd in timetableList) {
            let timetable = timetableList[grd]
            for(let grp in timetable) {
                classes.push({ grade: grd, group: grp })
            }
        }
    }

    function handleOption(target: EventTarget) {
        const value = (target as HTMLSelectElement).value
        const grdpList = value.split('-')
        grade = grdpList[0]
        group = grdpList[1]

        localStorage.setItem('timetable-grdp', value)
    }
</script>

<div class="timetable">
    <div class="timetable-desc">
        <div class="timetable-title">시간표 {selected}</div>
    </div>
    {#await init()}
        <div class="timetable-loader">
            <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
        </div>
        {:then}
            <div class="timetable-contents">
                {#each timetableList[+grade][+group] as timetable}
                    <div class="column">
                        {#each timetable as { subject, teacher }}
                            <div class="item">
                                <div class="subject">{subject == '' ? '-' : subject}</div>
                                <div class="teacher">{teacher == '' ? '-' : teacher}</div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
            <div class="selector">
                <select
                    bind:value={selected}
                    on:change={e => {
                        if(e?.target) handleOption(e.target)
                    }}>
                    {#each classes as { grade, group }}
                        <option value={`${grade}-${group}`}>{`${grade}학년 ${group}반`}</option>
                    {/each}
                </select>
            </div>
    {/await}
</div>

<style>
    .timetable {
        position: relative;
		min-width: 16em;
		min-height: 24em;
		padding: 1.5em;
		border-radius: 40px 40px;
		background-color: white;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
    }

	.timetable-desc {
        text-align: left;
	}

	.timetable-title {
		font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
	}

    .timetable-loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .timetable-contents {
        display: flex;
        margin-bottom: 15px;
    }

    .column {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .item {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        background-color: #fff;
        border: 1px solid #444;
    }

    .subject, .teacher {
        font-size: 15px;
    }

    .selector {
        display: flex;
        justify-content: center;
    }
</style>
