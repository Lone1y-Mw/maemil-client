<script lang="ts">
    import getTimetable from '~/functions/getTimetable'
	import { SyncLoader } from 'svelte-loading-spinners'

    let timetableList: any[][][][]

    let timetableLatestGrdp = localStorage.getItem('timetable-latest-grdp')?.split('-') || ['1', '1']
    let grd = timetableLatestGrdp[0]
    let grp = timetableLatestGrdp[1]
    let selected = grd + '-' + grp

    type Grdp = {
        grd: string;
        grp: string;
    }
    let classes: Grdp[] = []

    async function init() {
        timetableList = await getTimetable()
    
        for(let grd in timetableList) {
            let timetable = timetableList[grd]
            for(let grp in timetable) {
                classes.push({ grd, grp })
            }
        }
    }

    function handleOption(target: EventTarget) {
        const value = (target as HTMLSelectElement).value
        const grdp = value.split('-')
        grd = grdp[0]
        grp = grdp[1]

        localStorage.setItem('timetable-latest-grdp', value)
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
                {#each timetableList[+grd][+grp] as timetable}
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
                    on:change={e => e?.target && handleOption(e.target)}>
                    {#each classes as { grd, grp }}
                        <option value={`${grd}-${grp}`}>{`${grd}학년 ${grp}반`}</option>
                    {/each}
                </select>
            </div>
    {/await}
</div>

<style lang="scss">
    .timetable {
        position: relative;
		min-width: 250px;
		padding: 25px;
		border-radius: 40px;
		background-color: #fff;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
        .timetable-desc {
            .timetable-title {
                font-weight: bold;
                margin-bottom: 10px;
                text-align: center;
            }
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
            .column {
                display: flex;
                flex-direction: column;
                flex: 1;
                .item {
                    width: 100%;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: #fff;
                    border: 1px solid #444;
                    .subject, .teacher {
                        font-size: 15px;
                    }
                }
            }
        }
        .selector {
            display: flex;
            justify-content: center;
        }
    }
</style>
