<template>
    <div class="orderSuccess-page">
        <v-container class="mt-10 mb-10">
            <v-container class="image-container">
                <v-row justify="center" align="center">
                    <v-col
                        cols="12" sm="8" lg="5"
                    >
                    <v-img
                        height="320"
                        width="520"
                        src="@/assets/OrderSuccessfull.png"
                        class="orderSuccess-image"
                        >
                        </v-img>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="message-container">
                <v-row justify="center" align="center" align-content="center"
                >
                    <v-col cols="12" sm="5" md="4" align-self="center">
                        <p class="success-message">hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..</p>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="table-container">
                <v-row justify="center" align="center">
                    <v-col
                        cols="12" sm="10" md="7"
                    >
                        <v-simple-table class="contact-table">
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        Email Us
                                    </th>
                                    <th class="text-center">
                                        Contact Us
                                    </th>
                                    <th class="text-center">
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center">
                                    <td>
                                        admin@bookstore.com
                                    </td>
                                    <td>
                                        +91 8163475881
                                    </td>
                                    <td>
                                        42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row
                    justify="center" align="center"
                >
                <v-col cols="12" sm="4" md="3">
                    <v-btn color="primary" v-on:click: to= "/dashboard/books">
                        Continue Shopping
                    </v-btn>
                </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.success-message{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
}
/* .contact-table{
    border: 0.5px solid grey;
} */
thead{
    background: lightgrey;
}
td{
    border: 1px solid lightgrey;
}
@media only screen and (max-width: 665px){
    .orderSuccess-image{
        max-width: 360px;
    }
}
@media only screen and (max-width: 374px){
    .message-container{
        width: 100%;
    }
}
</style>