<template>
    <v-main>
        <h1 class="h1 text-center text-white ">Contact</h1>
        <p class=" text-center text-white">Feel free to contact us if you need help, have questions about the platform,
            or are having technical issues.</p>
        <v-card class="mx-auto" max-width="800">
            <form class="p-3">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field filled v-model="firstName" :error-messages="firstNameErrors" :counter="10"
                                label="First Name*" @input="$v.firstName.$touch()" >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">

                            <v-text-field filled v-model="email" :error-messages="emailErrors" label="Email*" 
                                @input="$v.email.$touch()"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field filled v-model="companyName" :error-messages="companyNameErrors" :counter="25"
                                label="Company Name*" @input="$v.companyName.$touch()">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field  filled v-model="phoneNumber" :error-messages="phoneNumberErrors" :counter="10"
                                label="Phone Number*" @input="$v.phoneNumber.$touch()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container>
                    <v-row>
                        <v-textarea filled  :error-messages="textareaErrors" :counter="80"
                            @input="$v.textarea.$touch()"  label="Text Field"
                            auto-grow v-model="textarea">
                        </v-textarea>
                    </v-row>
                </v-container>
                <v-container>
                    <v-row class="d-flex justify-content-center">
                        <v-btn class="mr-4" @click="submit">
                    submit
                </v-btn>
                    </v-row>
                </v-container>
               

            </form>
        </v-card>
    </v-main>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
    layout: 'user',
    mixins: [validationMixin],
    validations: {
        firstName: { required, maxLength: maxLength(10) },
        email: { required, email },
        companyName: { required, maxLength: maxLength(25) },
        phoneNumber: { required, maxLength: maxLength(10) },
        textarea:{ required, maxLength:  maxLength(80)}
    },
    data: () => ({

        firstName: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        textarea: '',
    }),
    computed: {
        firstNameErrors() {
            const errors = []
            if (!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.maxLength && errors.push('First Name must be at most 10 characters long')
            !this.$v.firstName.required && errors.push('First Name is required.')
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        companyNameErrors() {
            const errors = []
            if (!this.$v.firstName.$dirty) return errors
            !this.$v.companyName.maxLength && errors.push('Company Name must be less then 25 characters')
            !this.$v.companyName.required && errors.push('Company Name is required.')
            return errors
        },
        phoneNumberErrors() {
            const errors = []
            if (!this.$v.phoneNumber.$dirty) return errors
            !this.$v.phoneNumber.maxLength && errors.push('Phone Number must be less then 10 characters')
            !this.$v.phoneNumber.required && errors.push('Phone Number is required.')
            !this.$v.phoneNumber.numeric && errors.push('Number is not valid ')
            return errors
        },
        textareaErrors() {
            const errors = []
            if (!this.$v.textarea.$dirty) return errors
            // !this.$v.textarea.maxLength && errors.push('First Name must be at most 10 characters long')
            !this.$v.textarea.required && errors.push('Text field is required.')
            return errors
        },
    },

    methods: {
        submit() {
            this.$v.$touch()
            console.log(this.firstName, "first name")
            console.log(this.email, "first name")
            console.log(this.companyName, "first name")
            console.log(this.phoneNumber, "first name")
            console.log(this.textarea, "first name")

        },
    },
}
</script>
<style>
    .v-messages__message{
        color: red;
    }
</style>