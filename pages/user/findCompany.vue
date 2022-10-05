<template>
    <v-main class="p-0 mt-10">
        <v-spacer></v-spacer>
        <v-toolbar-title>Find Company</v-toolbar-title>
        <template v-for="company_list in pageOfItems" :loading="loading">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }"
                    class="mx-auto pa-6 grey lighten-2 transition-swing mx-auto my-12 d-flex flex-column">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="5" indeterminate></v-progress-linear>
                    </template>
                    <v-row>
                        <v-col class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div class="w-100">
                                <img height="100" size="80" src="../../assets/imges/companylogo.png" />
                            </div>
                        </v-col>
                        <v-col class=" col-lg-4 col-md-6 sm12  col-sm-6 col-xs-12">
                            <div class="w-100">
                                <v-card-title>{{company_list.company_name}}</v-card-title>
                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                    </v-row>
                                    <div class="my-4 text-subtitle-1 ">
                                        {{company_list.company_type}}
                                    </div>
                                </v-card-text>
                            </div>
                        </v-col>
                        <v-col class="col-lg-4 col-md-8 col-sm-6 col-xs-12">
                            <v-card-actions>
                                <div class="d-flex flex-column ">
                                    <v-rating :value="4.5" color="warning" dense half-increments readonly size="14">
                                    </v-rating>
                                    <v-btn color="success" outlined class="ma-2">
                                        HR Contact
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-hover>
        </template>
        <div v-if="loading" class="loading-page ">
            <div class="loading"></div>
        </div>
        <div class="d-flex justify-center">
            <jw-pagination :items="Company_list" @changePage="onChangePage"></jw-pagination>
        </div>

    </v-main>

</template>
<script>
import Vue from "vue";
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
export default {
    layout: "userdefault",
    middleware: ['userauth'],
    data() {
        return {
            pageOfItems: [],
            Company_list: [],
            company_list1: [],
            loading: false,
            page: 1,
            key: '',
            search: "",
            company: [
                { title: 'Company List', },
                { title: 'Company Pending', },
                { title: 'Company Approved' },
            ],
        }
    },

    mounted() {
        this.onload();
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        searchItem() {
            let data = [];
            this.search
            this.Company_list.map((ele) => {
                // console.log(ele.company_name,this.search,"check")
                if (ele.company_name.toLowerCase() == this.search.toLowerCase()) {
                    data.push(ele)
                }
                this.Company_list1 = data
            })
        },
        async onload() {
            this.loading = true

            let auth = localStorage.getItem('user_access_token');
            let company_id = localStorage.getItem('user_company_id');
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${auth}`,
                },
            };
            await this.$axios
                .get(`v1/company-list-byuser`,config)
                .then((response) => {
                    console.log(response)
                    this.Company_list = response.data.data
                    if (response.data.code == 200) {
                        this.loading = false
                    }
            });
        }
    }
};
</script>
    
<style scoped>
.page-item .page-number {

    color: #0a0a0a !important;
    background-color: #fff;
    border: 1px solid #dee2e6;
}

.v-rating button {
    font-size: 20px !important;
}

.height {
    height: 157px !important;
    border-bottom: 8px solid #e3dddd;
}

.loading-page {
    position: fixed;
    top: 345px;
    right: 622px;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 4rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading {
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    border: 4px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}

.edit {
    padding: 5px;
}

.edit:hover {
    background-color: #007bff;
}

.fs-18 {
    font-size: 18px;
}

.w-45 {
    width: 33% !important;
}

.color {
    color: rgba(0, 0, 0, 0.6)
}
</style>
  