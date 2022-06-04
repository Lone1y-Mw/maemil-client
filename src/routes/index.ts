import Home from '~/components/Home/Home.svelte'
import Community from '~/components/Community/Community.svelte'
import Comingsoon from '~/components/Comingsoon.svelte'
import Login from '~/components/Login/Login.svelte'
import Register from '~/components/Register/Register.svelte'
import Article from '~/components/Community/Article.svelte'

export default {
    '/': Home,
    '/community': Comingsoon,
    // '/community': Community,
    // '/community/:href': Article,
    // '/login': Login,
    // '/register': Register
}