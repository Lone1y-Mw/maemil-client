<script lang="ts">
    import { link } from 'svelte-spa-router'
    import active from 'svelte-spa-router/active'

    export let navlinkItem

    const name = navlinkItem.name
    const icon = navlinkItem.icon
    const to = navlinkItem.to
    const activePath = navlinkItem.activePath
</script>

<div class="navitem">
    <a
        href={to}
        use:link
        use:active={activePath}>
        <div class="wrap">
            <div class="icon">
                <svelte:component this={icon} />
            </div>
            <div class="name">{name}</div>
        </div>
    </a>
</div>

<style lang="scss">
    .navitem {
        width: 50px;
        height: 50px;
        border-radius: 10px;

        a {
            &:focus > .wrap {
                box-shadow: 0 0 0 0.2rem rgb(0 140 255 / 25%);
            }
        }

        .wrap {
            width: 40px;
            height: 40px;
            margin: 5px;

            .icon {
                height: 24px;
                text-align: center;
            }

            .name {
                text-align: center;
                color: #c7c7c7;
                font-size: 10px;
                font-weight: bold;
            }
        }
    }
        

    :global(a.active > .wrap > .icon > svg) {
        fill: $primary-color-default;
    }

    :global(a.active > .wrap > .name) {
        color: $primary-color-default!important;
    }
</style>