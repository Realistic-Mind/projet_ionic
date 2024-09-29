<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Sign Up</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Input for First Name -->
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input v-model="firstName" required></ion-input>
        </ion-item>
  
        <!-- Input for Last Name -->
        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input v-model="lastName" required></ion-input>
        </ion-item>
  
        <!-- Input for Email -->
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" required></ion-input>
        </ion-item>
  
        <!-- Input for Password -->
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
  
        <!-- Sign Up Button -->
        <ion-button expand="block" @click="handleSignUp">Sign Up</ion-button>
  
        <!-- Error message display -->
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
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  } from '@ionic/vue';  // Import necessary Ionic components
  
  import { useRouter } from 'vue-router';
  import { signUp } from '../services/apiService';  // Import the API service
  
  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonFooter,
      IonBackButton,
      IonButtons,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    data() {
      return {
        firstName: '',  // Bound to first name input
        lastName: '',   // Bound to last name input
        email: '',      // Bound to email input
        password: '',   // Bound to password input
        errorMessage: '',  // Used to display any error messages
      };
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
      async handleSignUp() {
        // 1. Check if all fields are filled
        if (!this.firstName || !this.lastName || !this.email || !this.password) {
          this.errorMessage = 'Please fill in all the fields';
          return;
        }
  
        try {
          // 2. Send data to the API
          const data = await signUp(this.firstName, this.lastName, this.email, this.password);
          console.log('Sign Up Successful:', data);
  
          // 3. Redirect to the login page
          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = this.getErrorMessage(error);  // Handle any errors
        }
      },
  
      // Error handler to display meaningful messages
      getErrorMessage(error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const axiosError = error as { response: { data: { message?: string } } };
          return axiosError.response.data.message || 'Sign-up failed. Please check your information.';
        } else if (error instanceof Error) {
          return error.message;
        } else {
          return 'An unknown error occurred.';
        }
      },
    },
  });
  </script>
  
  