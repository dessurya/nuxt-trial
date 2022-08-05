<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" @click="signoutHendle()" href="#" role="button" alt="sign-out" title="sign out">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default{
        name: 'LteMainNav',
        methods: {
            signoutHendle() {
                this.$toast.show('Sign Out successs...!')
                this.$auth.logout()
            }
        }
    }
</script>