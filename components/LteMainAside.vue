<template>
    <aside id="leftSideBar" class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" class="brand-link">
            <img src="adminlte-dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">asd</span>
        </a>
        <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image"><img src="adminlte-dist/img/avatar5.png" class="img-circle elevation-2" alt="User Image"></div>
                <div class="info"><a href="#" class="d-block">{{ sessLogin.authLogin.nama }}</a></div>
            </div>

            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item"><a href="/" class="nav-link">DASHBOARD</a></li>
                    <li class="nav-item"><a href="/TbMatkul" class="nav-link">MATA KULIAH</a></li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
    export default{
        name: 'LteMainAside',
        data() {
            return {
                sessLogin: this.$store.state.authLogin
            }
        },
        computed:{
            authLogin () {
                return this.$store.state.authLogin
            }
        }
    }
</script>