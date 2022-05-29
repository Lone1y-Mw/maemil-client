<script lang="ts">
    import Navitem from './Navitem.svelte'
    import HomeIcon from '~/icons/HomeIcon.svelte'
    import CommunityIcon from '~/icons/CommunityIcon.svelte'

    let navlinkItems = [
        { name: '홈', icon: HomeIcon, to: '/', activePath: '/' },
        { name: '커뮤니티', icon: CommunityIcon, to: '/community', activePath: /\/community\/*/ }
    ]
</script>

<div class="navbar">
    <div class="links">
        {#each navlinkItems as navlinkItem}
            <Navitem {navlinkItem} />
        {/each}
    </div>
</div>

<style lang="scss">
    /* @media screen and (max-width: 700px) {
        .navbar {
            display: none;
        }
    } */

    .navbar {
        box-shadow: 0 1px 3px #ccc;
        margin-bottom: 40px;
        .links {
            display: flex;
            width: fit-content;
            height: 50px;
            margin: 0 auto;
        }
    }
</style>