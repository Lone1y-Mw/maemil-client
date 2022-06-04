<script lang="ts">
    import getTimetable from '~/functions/getTimetable'
	import { SyncLoader } from 'svelte-loading-spinners'
    import updateGrdp from '~/firebase/updateGrdp'

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

    const weekDay = ['월', '화', '수', '목', '금']

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
        updateGrdp(value)
    }
</script>

<div class="timetable">
    <div class="timetable-desc">
        <div class="timetable-title">
            시간표
            <span class="title-grdp">
                {selected}
            </span>
        </div>
    </div>
    {#await init()}
        <div class="timetable-loader">
            <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
        </div>
        {:then}
            <div class="timetable-contents">
                <div class="timetable-weekday">
                    {#each weekDay as day}
                        <div class="timetable-day">
                            {day}
                        </div>
                    {/each}
                </div>
                <div class="timetable-main">
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
		margin: 0 auto 30px;
        position: relative;
		width: 250px;
        height: 410px;
		padding: 25px;
		border-radius: 20px;
		background-color: #fff;
		box-shadow: 1px 1px 7px 2px #d3d3d3;
        .timetable-desc {
            .timetable-title {
                font-weight: bold;
                margin-bottom: 10px;
                text-align: center;
                .title-grdp {
                    color: $primary-color-default;
                }
            }
        }
        .timetable-loader {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .timetable-contents {
            margin-bottom: 15px;
            .timetable-weekday {
                display: flex;
                .timetable-day {
                    width: 100%;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: #fff;
                    border: 1px solid $primary-color-default;
                    color: $primary-color-default;
                    font-weight: bold;
                }
            }
            .timetable-main {
                display: flex;
                .column {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    .item {
                        width: 100%;
                        box-sizing: border-box;
                        text-align: center;
                        background-color: #fff;
                        border: 1px solid $primary-color-default;
                        .subject, .teacher {
                            font-size: 15px;
                        }
                        .subject {
                            font-weight: bold;
                        }
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
