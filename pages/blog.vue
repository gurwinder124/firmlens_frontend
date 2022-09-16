<template>
  <v-main>
    <v-container>
      <h1 class="text-center text-white mb-3">Our Blogs</h1>
      <v-row class="blog d-flex mt-3">
        <v-col cols="4">
            <v-card
              elevation="2"
              class="mb-3"
            >
              <v-card-title>
                <v-text-field hide-details prepend-icon="mdi-magnify" single-line placeholder="Search"
                    v-model="search" as="search" v-on:input="searchItem"></v-text-field>
              </v-card-title>
              <v-card-text> 

              </v-card-text>
            </v-card> 
        </v-col>
        <v-col cols='8' class="blog2">
         
        <v-card
              elevation="2"
              v-for="post of posts"
              :key="post.id"
              class="mb-3"
            >
              <img
                class="imgstyle w-100"
                src="https://ueibi.com/public/uploads/1657897571.png"
                alt=""
              />
              <v-card-title>
                {{ post.title }}
              </v-card-title>
              <v-card-text> {{ post.description }}</v-card-text>
            </v-card> 
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

  <style>
.blog {
  background-color: white;
}


</style>
  <script>
export default {
  layout: "user",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    let auth = localStorage.getItem("user_access_token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    this.$axios.get("/v1/blogs-list", config).then((Response) => {
      console.log("resdsfds", Response.data.data);
      this.posts = Response.data.data;
    });
    //   this.posts = await this.$content().fetch()
  },
};
</script>
  