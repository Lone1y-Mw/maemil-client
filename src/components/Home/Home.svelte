<script lang="ts">
    import Todo from './Todo.svelte'
    import Meal from './Meal.svelte'
    import Schedule from './Schedule.svelte'
    import Timetable from './Timetable.svelte'
</script>

<div class="home">
    <div>
        <Todo />
    </div>
    <div>
        <Timetable />
    </div>
    <div>
        <Meal />
    </div>
    <div>
        <Schedule />
    </div>
</div>

<style lang="scss">
    .home {
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        & > * {
            margin: 15px;
        }
    }
</style>