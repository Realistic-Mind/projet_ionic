<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="light" style="background-color: #ffc0cb;">
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content style="background-color: #4b2e2a;" class="ion-padding">
        <!-- Input pour Email -->
        <ion-item style="--background: #d3d3d3;">
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" required></ion-input>
        </ion-item>
  
        <!-- Input pour Password -->
        <ion-item style="--background: #d3d3d3;">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
  
        <!-- Bouton de Connexion -->
        <ion-button expand="block" style="background-color: #ffff00; color: black; margin-top: 20px;" @click="handleLogin">LOGIN</ion-button>
  
        <!-- Message d'erreur si échec de la connexion -->
        <ion-item v-if="errorMessage" style="background-color: transparent; color: red;">
          <ion-label>{{ errorMessage }}</ion-label>
        </ion-item>
  
        <!-- Bouton pour Sign Up -->
        <ion-button expand="block" style="background-color: #ffff00; color: black; margin-top: 10px;" @click="goToSignup">SIGN UP</ion-button>
    </ion-content>
  
      <ion-footer>
        <ion-toolbar color="dark">
          <ion-title>Pied de page</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  import {useRouter} from 'vue-router'
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
    setup() {
    const router = useRouter();
    
    const goToSignup = () => {
      router.push('/signup');
    };

    return {
      goToSignup,
    };
  },
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '', // Pour afficher un message d'erreur
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('https://server-1-t93s.onrender.com/api/tp/login', {
            email: this.email,
            password: this.password,
          });
  
          console.log('Login Successful:', response.data);
  
          // Rediriger l'utilisateur vers la page de géolocalisation après une connexion réussie
          this.$router.push('/geolocalisation');
        } catch (error) {
          console.error('Erreur de connexion:', error.response.data);
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.'; // Afficher un message d'erreur si la connexion échoue
        }
      },
    },
  });
  </script>
  
  <style scoped>
  ion-item {
    margin-bottom: 15px;
    --border-radius: 8px;
  }
  
  ion-label {
    color: black;
  }
  
  ion-button {
    font-weight: bold;
  }
  </style>
  