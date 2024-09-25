<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <!-- Input pour Email -->
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" required></ion-input>
        </ion-item>
  
        <!-- Input pour Mot de passe -->
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
  
        <!-- Bouton de Connexion -->
        <ion-item>
          <ion-button expand="block" @click="handleLogin">Se connecter</ion-button>
        </ion-item>
  
        <!-- Affichage des données pour test -->
        <ion-item>
          <ion-label>Email: {{ email }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Mot de passe: {{ password }}</ion-label>
        </ion-item>
      </ion-content>
  
      <ion-footer>
        <ion-toolbar color="secondary">
          <ion-title>Pied de page</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
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
  } from '@ionic/vue';
  
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
        email: "",
        password: ""
      };
    },
    methods: {
      handleLogin() {
        console.log("Email:", this.email);
        console.log("Mot de passe:", this.password);
        // Ici, on ajoutera l'appel API pour la connexion plus tard
      }
    }
  });
  </script>
  
  <style scoped>
  /* Ajoute du style ici si nécessaire */
  ion-item {
    margin-bottom: 15px;
  }
  </style>
  