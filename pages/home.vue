<template>

  <v-main>
      <div class="ml-6 d-flex align-center justify-content-between container">
        <div class="align-center justify-content-between margin-auto">
          <h1 class="text-white">Build stunning websites</h1>
          <h1 class="text-white">with NuxtJs UI Kit</h1>
          <p class="text-white h5 ">Free Vuetify UI Kit with Lots of Ready to Use Sections</p>
          <div class="mt-5">
            <v-btn rounded class=" text-dark px-4 py-4  bg-danger mr-4 fs-5">Get Started</v-btn>
          <NuxtLink to="/register" class="text-white text-decoration-none">
            <v-btn outlined rounded class="text-light  bg-transparent px-4 py-4 mr-4 fs-5">
              Register Company
            </v-btn></NuxtLink>
          </div>

        </div>
        <div class="mr-5">
          <img src="https://nextkit-nuxtjs-free-uikit.vercel.app/_nuxt/img/banner-img.4218b42.png" alt="">
        </div>
      </div>

    <div class="mini-spacer">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-9 col-lg-7 col-12">
            <div class="text-center">
              <h2 class="ui-title font-weight-bold text-secondary">Banners</h2>
              <p>
                Here you can check Demos we created you can easily use it. Its
                quite easy to Create your own dream website &amp; dashboard in
                No-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner1-component">
      <div class="container">
        <div class="row justify-content-center">
          <div class="d-flex align-items-center col-md-7 col-lg-6 col-12">
            <div class="text-center text-md-left"><span
                class="bg-light v-chip v-chip--no-color theme--light v-size--small white--text"><span
                  class="v-chip__content ">
                  Creating Brands
                </span></span>
              <h2 class=" banner1-title font-weight-boldtext-uppercase white--text">
                ONE BILLON PEOPLE USE FACEBOOK
              </h2>
              <p class="white--text op-8 font-weight-regular">
                Pellentesque vehicula eros a dui pretium ornare. Phasellus
                congue vel quam nec luctus.In accumsan at eros in dignissim.
                Cras sodales nisi nonn accumsan.
              </p>
              <div class="mt-16 pt-2"><a href="/basic-components"
                  class="btn-custom-md v-btn v-btn--has-bg v-btn--rounded v-btn--router theme--light elevation-0 v-size--large white"><span
                    class="v-btn__content">
                    Do you Need Help ?
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-5 col-lg-5 col-12">
            <div aria-label="banner" role="img" class="v-image v-responsive theme--light">
              <div class="v-responsive__sizer" style="padding-bottom: 125.494%;">
              </div>
              <div class="v-image_image v-imageimage--cover">
                <img src="https://nextkit-nuxtjs-free-uikit.vercel.app/_nuxt/img/banner1.a060502.jpg" alt="">
              </div>
              <div class="v-responsive_content" style="width: 506px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer start -->
    <footer class="v-footer mini-spacer footer v-sheet theme--light" data-booted="true">
      <div class="container">
        <div class="row py-0 py-md-15">
          <div class="px-xs-0 col-sm-12 col-md-12 col-lg-3 col-12">
            <h4 class="font-weight-regular font-18 color-3e4555">Address</h4>
            <p class="mt-10 text-secondary">71 Amsteroum Avenue Cronish Night, NY 35098</p>
          </div>
          <div class="px-xs-0 col-sm-12 col-md-12 col-lg-3 col-12">
            <h4 class="font-weight-regular font-18 color-3e4555">Phone</h4>
            <p class=" text-secondary">Reception : +205 123 4567</p>
            <p class="text-secondary">Office : +207 235 7890</p>
          </div>
          <div class="px-xs-0 col-sm-12 col-md-12 col-lg-3 col-12">
            <h4 class="font-weight-regular color-3e4555">Email</h4>
            <p class="mt-10 mb-0 text-secondary">
              Office : <NuxtLink to="#" >Seasiainfotech@gmail.com</NuxtLink>
            </p>
            <p class="text-secondary">
              Site :
              <NuxtLink to="#">seasiainfotech.com</NuxtLink>
            </p>
          </div>
          <div class="px-xs-0 col-sm-12 col-md-12 col-lg-3 col-12">
            <h4 class="font-18 color-3e4555">Social</h4>
            <div class="mt-10">
              <a href="#"><i class="ml-4 mdi mdi-facebook"></i></a> 
              <a href="#"><i class="ml-4 mdi mdi-twitter"></i></a> 
              <a href="#"><i class="ml-4 mdi mdi-google-plus"></i></a>
               <a href="#"><i class=" ml-4mdi mdi-youtube"></i></a>
                <a href="#"><i class="ml-4 mdi mdi-instagram"></i></a>
              </div>
          </div>
        </div>
        <div class="footer-bottom-bar font-14">
          <div class="d-block d-md-flex align-center">
            <p>
              All Rights Reserved by
              <NuxtLink to="#">seasiainfotech.com</NuxtLink>
            </p>
            <div class="ml-auto">
              <div class="d-flex align-center">
                <a href="#" class="link px-4">Terms of Use</a> 
                <a href="#" class="link px-4">Legal Disclaimer</a>
                 <a href="#" class="link px-4">Privacy Policy</a></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </v-main>
</template>
<script>
export default {
  layout: "user",
  name: "homePage",
  data: () => ({

  }),
  methods: {
    signup() {
      console.log("click");
      this.$router.push(`/register`);
    },
    login() {
      console.log("click");
      this.$router.push(`/login`);
    },
    home() {
      console.log("click");
      this.$router.push(`/home`);
    },
  },
};
</script>
<style scoped>
.h-100 {
  height: 90vh !important;
}

.margin-auto {
  margin: 82px 0px
}

.Thbody {
  background-image: url(https://ueibi.com/images/logon_secreen.png);
  /* background-color: #607DF9; */
  background-size: cover;
  height: 100vh;
}

.mini-spacer {
  padding: 75px 0px;
}

.banner1-component {
  background-color: #fdbfa8;
}

.color-3e4555 {
  color: #3e4555;
}
</style>
        