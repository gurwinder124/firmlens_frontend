
<template>
    <div class="">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 ">
                <!-- <div class="d-flex height "> -->
                <div class="firstdiv">
                    <div class="main-div">
                        <div class="d-flex justify-content-between align-items-center">
                            <NuxtLink to="/" class="text-decoration-none">
                                <h1 class="text-white">Firmlens</h1>
                            </NuxtLink><span>
                                <v-icon class="text-white">mdi-home</v-icon>
                            </span>
                        </div>
                        <p class="text-white content-text">We are LIVE in

                            Chandigarh CCR & Gurgaon

                            & will soon launch in 23 cities!!</p>
                        <p class="text-white content-text">Click on below and share your details
                            to be part of our exclusive network</p>
                        <NuxtLink to="/register" class="text-decoration-none">
                            <v-btn rounded class="text-dark px-4 py-4 mr-4 fs-5">Register</v-btn>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-8">

                <form class="form">
                    <h2>Forgot Password</h2>

                    <v-text-field v-model="password" label="Password" name="password"
                        type="password" :rules="passwordRules" />

                    <v-text-field v-model="confirmPassword" label="Confirm Password" name="confirmPassword"
                       type="password" :rules="confirmPasswordRules" />
                    <v-btn class="mr-4 bg-primary" depressed @click="submit">
                        Login
                    </v-btn>
                    <NuxtLink to="/resetpassword" class="text-decoration-underline ">Forgot Password?</NuxtLink>
                </form>
                <!-- <template>
                    <div class="text-center ma-2 v-snack">
                        <v-snackbar v-model="snackbar" rounded="pill" outlined right top
                            class=" v-snackbar-toast position">
                            {{ text }}
                            <template v-slot:action="{ attrs }">
                                <v-btn class="v-snack-btn" text v-bind="attrs" @click="snackbar = false">
                                    Close
                                </v-btn>
                            </template>
                        </v-snackbar>
                    </div>
                </template> -->
            </div>
        </div>
    </div>
</template>
        
<script>
export default {
    layout: 'auth',
    name: "forgotPage",


    data() {
    return {
      password: '',
      confirmPassword: '',
      passwordRules: [
        (value) => !!value || 'Password is required.',
        // (value) => (value && value.length >= 8) || 'minimum 6 characters',
      ],
      confirmPasswordRules: [
        (value) => !!value || 'Confirm Password is required' ,
        (value) =>
          value === this.password || 'Password not matched',
      ],
    }
},
    computed: {

        passwordConfirmationRule() {
            return () => (this.password === this.confirmPassword) || 'Password must match'
        },
    },

    methods: {
        async submit() {
            console.log(this.confirmPassword, this.password);
            // const config = {
            //   headers: {
            //     'Content-type': 'application/json',
            //   }
            // }
            // await this.$axios
            //   .post("/v1/login", {
            //     password: this.password,
            //     email: this.email,
            //   }, config)
            //   .then((resp) => {
            //     console.log(resp.data.msg)
            //     if (resp.data.success == true) {
            //       this.snackbar = true;
            //       this.text = "User Login Success"
            //       localStorage.setItem('user_access_token', resp?.data?.data?.token)
            //       console.log(resp.data.data.user.id, 'user_company_id')
            //       localStorage.setItem('user_company_id', resp?.data?.data?.user?.company_id)
            //       this.$router.push(`/user`);
            //     }
            //     else if(resp.data.status == 'error')
            //     {
            //       this.snackbar = true;
            //       this.text = `${resp.data.msg}`
            //     }
            //   }).catch((err) => {
            //     // console.log(err)
            //     this.snackbar = true;
            //     this.text = `${err.response.data.data.error}`
            //   })
        },
        clear() {
            this.$v.$reset()
            this.email = ''
            this.password = ''

        },
    },
    mounted() {
        console.log("page load")
        let auth = localStorage.getItem("user_access_token");
        if (auth) {
            console.log("user login")
            this.$router.push(`/user`);
        }
        else {
            console.log("user not  login")
        }
    }

};
</script>
<style scoped>
.firstdiv {
    background-image: url("../assets/imges/background.png");
}

.main-div {
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    padding: 68px 69px;
    text-align: left;
    height: 100vh;
}

.form {
    width: 75%;
    align-items: center;
    margin: 20% auto;
    ;
}

.m-20 {
    margin: 19px 15%;
}

.content-text {
    margin-bottom: 22px;
    padding: 27px 0px;
}

.height {
    height: 100vh;
}
</style>
          