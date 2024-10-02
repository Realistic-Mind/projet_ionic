<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Input for Email -->
        <ion-item>
          <ion-label class="custom-label" position="floating">Email</ion-label>
          <ion-input  class="custom-input" v-model="email" type="email" required></ion-input>
        </ion-item>
  
        <!-- Input for Password -->
        <ion-item>
          <ion-label class="custom-label" position="floating">Password</ion-label>
          <ion-input class="custom-input" v-model="password" type="password" required></ion-input>
        </ion-item> 
  
        <!-- Button for Login -->
        <ion-button expand="block" @click="handleLogin">Login</ion-button>
  
        <!-- Button for Sign Up (Redirects to the Sign Up page) -->
        <ion-button expand="block" color="light" @click="goToSignUp">Sign Up</ion-button>
  
        <!-- Error message if login fails -->
        <ion-item v-if="errorMessage" style="background-color: transparent; color: red;">
          <ion-label>{{ errorMessage }}</ion-label>
        </ion-item>
      </ion-content>
  
      <ion-footer>
        <ion-toolbar>
          <ion-title>Pied de page</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  } from '@ionic/vue';  // Import Ionic components
  import { useRouter } from 'vue-router';  // Import Vue Router
  import { login } from '../services/apiService';  // Import the API service
  
  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonFooter,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    data() {
      return {
        email: '',      // Bound to email input
        password: '',   // Bound to password input
        errorMessage: '',  // Used to display any error messages
      };
    },
    setup() {
      const router = useRouter();
  
      const goToSignUp = () => {
        router.push('/signup');  // Redirect to the Sign Up page
      };
  
      return {
        goToSignUp,
      };
    },
    methods: {
      async handleLogin() {
        //  Check if email and password are filled
        if (!this.email || !this.password) {
          this.errorMessage = 'Please fill in both email and password';
          return;
        }
  
        try {
          //  Call the API to send the data
          const data = await login(this.email, this.password);
          console.log('Login Successful:', data);
  
          //  Redirect to a simple page 
          this.$router.push('/geolocation');  
        } catch (error) {
          //  Handle errors and display an error message
          this.errorMessage = this.getErrorMessage(error);
        }
      },
  
      // Error handler to display meaningful messages
      getErrorMessage(error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const axiosError = error as { response: { data: { message?: string } } };
          return axiosError.response.data.message || 'Login failed. Please check your credentials.';
        } else if (error instanceof Error) {
          return error.message;
        } else {
          return 'An unknown error occurred.';
        }
      },
    },
  });
  </script>
  
  