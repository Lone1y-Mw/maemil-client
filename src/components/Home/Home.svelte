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
        // display: flex;
        // justify-content: center;
        // flex-direction: row;
        // flex-wrap: wrap;
    }
</style>