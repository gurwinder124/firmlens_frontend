<template>
    <div>
        <div class="row">
            <div class="col-4">
                <v-card class="mx-4 my-12 text-center border-none p-38" color="blue-grey lighten-4" max-width="600">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                   <div v-if="companyDetails.company_logo == ''">
                        <img src="../../assets/imges/companylogo.png" class="px-4 w-50" alt="" />
                        <h5 class="mt-3">Company logo</h5>
                    </div>
                    <div v-else>
                        <img :src="companyDetails.company_logo" class="px-4 w-50" alt="" />
                        <h5 class="mt-3">Company logo</h5>
                    </div>
                </v-card>
            </div>
            <div class="col-8" 
           
            >
                <v-card class="mx-auto my-12 p-38" color="blue-grey lighten-4" max-width="600"
                    >
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb">
                            <h5>Company Name</h5>
                        <h5>{{companyDetails.company_name}}</h5>
                        </div>
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb">
                            <h5>Company Type</h5>
                            <h5>{{companyDetails.company_type}}</h5>
                        </div>
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb"
                        v-if="companyDetails.domain_name == null"
                        >
                            <h5>Company Type</h5>
                            <h5>abc.com</h5>
                        </div>
                        <div class="col-12 d-flex justify-content-between border-bottom-bfbbbb"
                        v-else
                        >
                            <h5>Company Type</h5>
                            <h5>{{companyDetails.domain_name}}</h5>
                        </div>
                    </div>
                </v-card>
            </div> 
            <div class="col-11 text-right">
                <nuxt-link :to="`/user/editprofile/${companyDetails.id}`" class="text-decoration-none text-dark">
                    <v-btn class="accpet" color="primary" dark>
                        Edit
                        <v-icon class="subtitle-2" dark right>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    layout: 'userdefault',
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
    mounted() {
        let auth = localStorage.getItem("access_token");
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${auth}`,
            },
        };

            this.$axios.get(`/v1/edit-company`, config).then((Response) => {
                this.companyDetails = Response.data.data
                // this.editedItem = Response.
                    console.log(this.companyDetails, "mfdgjf")
            })
    }

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