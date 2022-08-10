<template>
    <div class="login-box">
			<div class="login-logo">
				<a href="#">Selamat Datang Di <b>Aplikasi</b></a>
			</div>

			<div class="card">
				<div class="card-body login-card-body">
					<p class="login-box-msg">Masuk untuk memulai sesi Anda</p>
					<form @submit.prevent="signinHendle()">
						<div class="input-group mb-3">
							<input v-model="input.email" type="email" name="email" class="form-control" placeholder="Email">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-user"></span>
								</div>
							</div>
						</div>
						<div class="input-group mb-3">
							<input v-model="input.password" type="password" class="form-control" placeholder="Password">
							<div class="input-group-append">
								<div class="input-group-text">
									<span class="fas fa-lock"></span>
								</div>
							</div>
						</div>
						<div class="input-group mb-3">
							<button class="btn btn-outline-primary btn-block" type="submit">Signin</button>							
						</div>
					</form>
				</div>
			</div>
		</div>
</template>

<script>
export default{
    data(){
        return{
            input:{ email:'', password:'' }
        }
    },
    methods: {
        async signinHendle() {
            try {
                this.$toast.show('Sign in Process...')
                await this.$auth.loginWith('local', { data: this.input }).then((res) => {
                    if (this.$auth.loggedIn) { this.$toast.show('Sign in Success...!') }
                    else{ this.$toast.show('Sign in fail...!') }
                }).catch(e => {
                    this.$toast.show('Sign in fail...!')
                })
            } catch (error) {
                this.$toast.show('Sign in fail...!')
            }
        }
    },
    middleware: ['guest'],
    layout: 'blank',
    head:{
        bodyAttrs:{
            class:'hold-transition login-page'
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