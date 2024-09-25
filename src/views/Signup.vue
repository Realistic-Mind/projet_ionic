<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/login"></ion-back-button>
          </ion-buttons>
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
  
        <!-- Button for Sign Up -->
        <ion-button expand="block" @click="handleSignUp">SIGN UP</ion-button>
  
        <!-- Error message display if sign-up fails -->
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
  import axios from 'axios';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonItem, IonLabel, IonInput, IonButton, IonBackButton, IonButtons } from '@ionic/vue';
  
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
      IonBackButton,
      IonButtons,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errorMessage: '', // For error messages
      };
    },
    methods: {
      async handleSignUp() {
        try {
          // Sending the POST request to the sign-up API
          const response = await axios.post('https://server-1-t93s.onrender.com/api/tp/signup', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          });
  
          console.log('Sign Up Successful:', response.data);
  
          // Redirect the user to the login page after successful sign-up
          this.$router.push('/login');
        } catch (error) {
          console.error('Sign Up Error:', error.response?.data || error.message);
          this.errorMessage = error.response?.data?.message || 'Sign-up failed. Please check your information.';
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* Component-specific styles */
  ion-item {
    margin-bottom: 15px;
  }
  
  ion-label {
    color: black;
  }
  </style>
  