<script lang="ts">
    import Todo from './Todo.svelte'
    import Meal from './Meal.svelte'
    import Schedule from './Schedule.svelte'
    import Timetable from './Timetable.svelte'
</script>

<div class="home">
    <Todo />
    <Timetable />
    <Meal />
    <Schedule />
</div>

<style lang="scss">
    .home {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    :global(.home > *) {
        margin: 15px;
    }
</style>