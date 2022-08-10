<template>
    <aside id="leftSideBar" class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" class="brand-link">
            <img src="adminlte-dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">NUXT AUTH</span>
        </a>
        <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image"><img src="adminlte-dist/img/avatar5.png" class="img-circle elevation-2" alt="User Image"></div>
                <div class="info"><a href="#" class="d-block">{{ this.$auth.user.user.name }}</a></div>
            </div>

            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <nuxt-link to="/">
                            <a class="nav-link">DASHBOARD</a>
                        </nuxt-link>
                    </li>
                    <li class="nav-item" v-if="this.$auth.user.akses.user">
                        <nuxt-link to="/user">
                            <a class="nav-link">USER</a>
                        </nuxt-link>
                    </li>
                    <li class="nav-item" v-if="this.$auth.user.akses.lfb011">
                        <nuxt-link to="/lfb011">
                            <a class="nav-link">LFB011</a>
                        </nuxt-link>
                    </li>
                    <li class="nav-item" v-if="this.$auth.user.akses.lfe011">
                        <nuxt-link to="/lfe011">
                            <a class="nav-link">LFE011</a>
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
    export default{
        name: 'LteMainAside',
    }
</script>

<style>
    .nav-item a{
        cursor: pointer;
    }
</style>