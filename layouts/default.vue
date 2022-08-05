<template>
    <div>
        <LteMainNav />
        <LteMainAside />
        <div class="content-wrapper">
            <section class="content">
                <div class="container-fluid">
                    <Nuxt/>
                </div>
            </section>
        </div>
        <footer class="main-footer"><div class="float-right d-none d-sm-block"><b>Version</b> 3.1.0-pre</div><strong>Copyright &copy; 2014-2020 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.</footer>
        <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
</template>

<script>
import LteMainNav from '~/components/LteMainNav.vue'
import LteMainAside from '~/components/LteMainAside.vue'

export default {
    components: {
        LteMainNav, LteMainAside
    },
    head:{
        bodyAttrs:{
            class: 'hold-transition sidebar-mini'
        },
        link:[
            { rel:'stylesheet', type:'text/css', href:'/fontawesome-free/css/all.min.css' },
            { rel:'stylesheet', type:'text/css', href:'/adminlte-dist/css/adminlte.min.css' }
        ],
        script:[
            { type:'text/javascript', src:'/jquery/jquery.min.js'},
            { type:'text/javascript', src:'/bootstrap/js/bootstrap.bundle.min.js'},
            { type:'text/javascript', src:'/adminlte-dist/js/adminlte.min.js'}
        ]
    }
}
</script>