<template>
    <div class="row">
            <div class="col-4">
                <v-card class="mx-4 my-12 text-center border-none p-38" color="blue-grey lighten-4" max-width="600">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <img src="../../assets/imges/companylogo.png" class="px-4 w-50" alt="" />
                    <h5 class="mt-3">Company logo</h5>
                </v-card>
            </div>
            <div class="col-8">
                <v-card class="mx-auto mt-12 p-38" color="blue-grey lighten-4" max-width="600">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb">
                            <h5>Company ID</h5>
                            <h5>name</h5>
                        </div>
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb">
                            <h5>Company Name</h5>
                            <h5>Email</h5>
                        </div>
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb">
                            <h5>Company Type</h5>
                            <h5>password</h5>
                        </div>
                    </div>
                </v-card>
            </div>
            <div class="col-11 text-right">
                <nuxt-link :to="`/admin/profile/1`">
                    <v-btn class="accpet" color="primary" dark>
                        Edit
                        <v-icon class="subtitle-2" dark right>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </nuxt-link>
            </div>
        </div>
</template>
<script>

export default {
    layout: 'default',
    data: () => ({
        dialog: false,
        companyDetails: [],
        editedIndex: 1,
        editedItem: {
            name: '',
            type: '',
            status: ''
        },
        // defaultItem: {
        //   name: "",
        //   calories: 0,
        //   fat: 0,
        //   carbs: 0,
        //   protein: 0,
        // },
    }),

    methods: {
        close() {
            this.dialog = false;
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        },
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
    },
    // mounted() {
    //     let auth = localStorage.getItem("access_token");
    //     const config = {
    //         headers: {
    //             'Content-type': 'application/json',
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     };
    //     if (auth) {
    //         console.log("user login")
    //         this.$axios.get(`admin/company/${this.$route.params.id}`, config).then((Response) => {
    //             this.companyDetails = Response.data.data
    //             this.editedItem = Response.
    //                 console.log(this.companyDetails, "mfdgjf")
    //         })
    //     }
    //     else {
    //         console.log("user not  login")
    //         this.$router.push(`/admin/login`);
    //     }
    // }

}
</script>
<style scoped>
.p-38 {
    padding: 38px !important;
}

.border-bottom-bfbbbb {
    border-bottom: 1px solid #bfbbbb;
}

.margin {
    margin: -49px 0px;
}
</style>
<script>
    export default{
        layout : "default",

    }
</script>