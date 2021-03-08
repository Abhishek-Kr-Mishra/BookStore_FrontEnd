<template>
    <div class="login-page">
        <section>
            <div class="container">
                <div class="left">
                    <div class="left-content">
                        <v-img src="@/assets/BookStoreLogo.png" class="image"></v-img>
                    </div>
                </div>
                <div class="right">
                    <div class="right-content">
                        <v-btn
                            plain
                            class="ml-4"
                            v-on:click="loginContent"
                        >
                            LOGIN
                        </v-btn>
                        <v-btn
                            plain
                            class="font-weight ml-13 sigin-btn"
                            v-on:click="signinContent"
                        >
                            SIGIN
                        </v-btn>
                        <div v-if="login">
                            <v-subheader class="ml-n4 font-weight-black">Email Id</v-subheader>
                            <v-text-field 
                                outlined dense class="mt-n4 email-class"
                                single-line
                                :rules="[rules.required, rules.email]"
                                v-model="loginData.email"
                            >
                            </v-text-field>
                            <v-subheader class="mt-n5 ml-n4 font-weight-black">Password</v-subheader>
                            <v-text-field 
                                single-line
                                outlined dense class="mt-n4 password-class"
                                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="show ? 'text' : 'password'"
                                :rules="[rules.required, rules.password]"
                                @click:append="show = !show"
                                v-model="loginData.password"
                            >
                            </v-text-field>
                            <v-btn
                                plain
                                x-small
                                class="mt-n13 forget-btn"
                            >
                                Forget Password?
                            </v-btn>
                            <v-btn
                                block
                                color="#A03037"
                                dark
                                class="mt-n5"
                                v-on:click="loginUser"
                            >
                                Login
                            </v-btn>
                            <div class="seperator mt-8">OR</div>
                            <v-btn
                                depressed
                                color="primary"
                                small
                                class="ml-5 mt-8"
                            >
                                Facebook
                            </v-btn>
                            <v-btn
                                depressed
                                small
                                class="google-btn ml-3 mt-8"
                            >
                                Google
                            </v-btn>
                        </div>
                        <div v-if="signin">
                            <v-subheader class="ml-n4  font-weight-black">Full Name</v-subheader>
                            <v-text-field 
                                outlined dense class="mt-n4 name-class"
                                single-line
                                :rules="[rules.required, rules.name]"
                                v-model="signinData.fullName"
                            >
                            </v-text-field>
                            <v-subheader class="ml-n4 mt-n6 font-weight-black">Email Id</v-subheader>
                            <v-text-field 
                                outlined dense class="mt-n4 email-class"
                                single-line
                                :rules="[rules.required, rules.email]"
                                v-model="signinData.email"
                            >
                            </v-text-field>
                            <v-subheader class="mt-n7 ml-n4 font-weight-black">Password</v-subheader>
                            <v-text-field 
                                single-line
                                outlined dense class="mt-n4 password-class"
                                height="10"
                                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="show ? 'text' : 'password'"
                                :rules="[rules.required, rules.password]"
                                @click:append="show = !show"
                                v-model="signinData.password"
                            >
                            </v-text-field>
                            <v-subheader class="ml-n4 mt-n6 font-weight-black">Phone Number</v-subheader>
                            <v-text-field 
                                outlined dense class="mt-n4 phone-class"
                                single-line
                                :rules="[rules.required, rules.phoneNumber]"
                                v-model="signinData.phoneNumber"
                            >
                            </v-text-field>
                            <v-btn
                                block
                                color="#A03037"
                                dark
                                class="mt"
                                v-on:click="registerUser"
                            >
                                Register
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import UserService from '../Services/usersService'
export default {
    // components:{
    //     'register-page': Register
    // },
    data() {
        return{
            login: true,
            signin:false,
            show: false,
            loginData:{
                email: '',
                password: ''
            },
            signinData:{
                fullName: '',
                email: '',
                password: '',
                phoneNumber: ''
            },
            emailBoolean: false,
            passwordBoolean: false,
            nameBoolean: false,
            phoneBoolean: false,
            rules: {
                required: value => !!value || 'Required.',
                password: value => {
                    const passwordPatttern = /^(?=.{8,}$)(?=.*?[0-9])(?=.*[A-Z])[a-zA-Z0-9]*[#!@$^&-][a-zA-Z0-9]*$/
                    this.passwordBoolean = passwordPatttern.test(value)
                    return this.passwordBoolean || 'In-valid Password'
                },
                email: value => {
                    const emailPattern = /^[A-Za-z0-9]+([.\-_][a-zA-Z0-9]+)*@[a-zA-Z0-9]+[.][a-zA-Z]{2,4}([\\.][a-zA-Z]{2}){0,1}$/
                    this.emailBoolean = emailPattern.test(value)
                    return this.emailBoolean || 'In-valid Email ID'
                },
                name: value => {
                    const namePattern = /^[A-Z][a-zA-Z]{2,}/
                    this.nameBoolean = namePattern.test(value)
                    return this.nameBoolean || 'Minimum 3 letters, 1st letter Capital'
                },
                phoneNumber: value =>{
                    const phonePattern = /^[6-9]{1}[0-9]{9}$/
                    this.phoneBoolean = phonePattern.test(value)
                    return this.phoneBoolean || 'In-valid Phone Number'
                }
            }
        }
    },
    methods:{
        loginContent: function(){
            if(this.signin === true)
            {
                this.login = true
                this.signin = false
            }
        },
        signinContent: function(){
            if(this.login === true)
            {
                this.signin = true
                this.login = false
            }
        },
        loginUser: function(){
            if(this.emailBoolean && this.passwordBoolean)
            {
                UserService.loginUser(this.loginData)
                .then((res) => {
                    console.log(res)
                    const accessToken = res.data.result.accessToken
                    localStorage.setItem('accessToken', accessToken)
                    this.$router.push({ path: '/dashboard/books' })
                })
                .catch(e => {
                    console.log(e)
                    this.login = true
                    this.signin = false
                })
                console.log("Email-ID",this.loginData.email)
                console.log("Password",this.loginData.password)
            }
        },
        registerUser: function(){
            if(this.nameBoolean && this.emailBoolean && this.passwordBoolean && this.phoneBoolean){
                UserService.registerUser(this.signinData)
                .then((res) => {
                    console.log(res)
                    console.log("User Registered Sucssesfull", this.signinData)
                    this.login = true
                    this.signin = false
                })
                .catch((e) => {
                    console.log(e)
                    alert("Registration was un-sucssesfull")
                    this.login = true
                    this.signin = false
                })
                console.log(this.signinData)
            }
        }
    }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
section{
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ADADAD;
}
.container{
    width: 60%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left{
    width: 50%;
    height: 370px;
    background: #F5F5F5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.right{
    width: 50%;
    min-height: 430px;
    background: #FFFFFF;
    margin-left: -80px;
    display: flex;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 10px 5px 20px grey;

}
.image{
    border-radius: 50%;
    height: 200px;
    width: 200px;
}
.v-text-field--outlined >>> fieldset {
  border-color: 1px solid lightgrey;
}
.v-btn__content:target{
    color: black;
    font-weight: bolder;
    font-size: large;
    text-decoration: underline;
}
.forget-btn{
    margin-left: 110px;
}
.seperator{
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
}
.seperator::before,
.seperator::after{
    content: " ";
    flex: 1;
    border-bottom: 2px solid #EEEFF3;
}
.google-btn{
    border: 1px solid lightgrey;
}
@media only screen and (max-width: 767px){
    .container{
        width: 90%;
    }
    .left{
        display: none;
    }
    .right{
        width: 100%;
        margin: 0;
    }
}
@media (min-width: 768px) and (max-width: 1024px){
    .container{
        width: 70%;
    }
   .image{
        height: 150px;
        width: 150px;
    }
    .right{
        margin-left: -30px;
    }
}
</style>