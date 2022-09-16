
<template>

    <div class="container">
        <div class="row">
            <div class="col-4">
                <h3>Find Company</h3>
            </div>
            <div class="col-4 offset-4 ">
                <v-text-field hide-details prepend-icon="mdi-magnify" single-line placeholder="Search Company"
                    v-model="search" as="search" v-on:input="searchItem"></v-text-field>
            </div>
        </div>
        <div class="row">
            <!-- <div class="col-xl-4 col-3">

                <v-list-group :value="true">
                    <template v-slot:activator>
                        <v-list-item-title>Category</v-list-item-title>
                    </template>

                    <v-list>
                        <v-list-item v-for="(item, i) in company" :key="i" :to="item.to" router exact>
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-list-group>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </div> -->
            <div class="col-xl-12 col-12">
                <table class="w-100">
                    <thead>
                        <th class="fs-18 color w-25">Company Logo</th>
                        <th class="fs-18 color w-25">Company List</th>
                        <th class="fs-18 color w-25">Rating</th>
                    </thead>
                    <tbody >
                        <tr v-for="(company_list,id) in Company_list" :key="company_list.id" class="height">
                        <td>
                            <div class="w-25 ">
                            <img src="../../assets/imges/company.jpeg" alt="">
                        </div>
                        </td>
                        <td>
                            <div class="card mb-4 border-0 width">
                                <h5 class="border-0">{{company_list.company_name}}</h5>
                                  <li>{{company_list.company_type}}</li>
                                  <v-btn  class="w-50" >HR Contact</v-btn>
                                  <!-- <button class="edit  border border-primary w-45">HR Contact</button> -->
                            </div>
                        </td>
                        <td>
                            <div class="card m-4 mb-4 border-0">
                                <div class="d-flex">
                                    <img src="../../assets/imges/star-full.svg" alt="" width="20">
                                    <img src="../../assets/imges/star-full.svg" alt="" width="20">
                                    <img src="../../assets/imges/star-full.svg" alt="" width="20">

                                </div>
                                <p>Company Description</p>

                            </div>
                        </td>
                       </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
    
<script>
// import axios from "axios";

export default {
    layout: "userdefault",
    data() {
        return {
            Company_list: [],
            company_list1: [],
            key: '',
            search: "",
            company: [
                {
                    title: 'Company List',
                },
                {
                    title: 'Company Pending',
                },
                {
                    title: 'Company Approved',
                },
            ],
            items: [
                {
                    // icon: 'mdi-account-multiple',
                    // title: 'Employee List',
                    // to: '/user/employeelist'
                },
            ],
        }
    },
    async mounted() {
        let auth = localStorage.getItem('user_access_token');
        // let company_id = localStorage.getItem('user_company_id');
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${auth}`,
            },
        };
        await this.$axios
            .get(
                `v1/company-list-byuser`,
                config
            )
            .then((response) => {
                this.Company_list = response.data.data
            });
    },
    methods: {

        // onChange(event) {

        // console.log(event.target.value)

        // }

        searchItem() {

            let data = [];
            this.search
            this.Company_list.map((ele) => {
                // console.log(ele.company_name,this.search,"check")
                if (ele.company_name.toLowerCase() == this.search.toLowerCase()) {
                    data.push(ele)
                }
                this.Company_list1 = data
                console.log(this.Company_list1, "ele")
            })

        }
    }
};
</script>
    
<style scoped>
.v-rating button {
    font-size: 20px !important;
}
.height{
 height: 157px !important;
    border-bottom: 8px solid #e3dddd;
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
.w-45{
    width: 33% !important;
}
.color{
    color: rgba(0, 0, 0, 0.6)
}
</style>
  