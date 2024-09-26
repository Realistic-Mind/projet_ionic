<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Geolocation</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Display current latitude and longitude -->
        <ion-item>
          <ion-label>Latitude: {{ latitude }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Longitude: {{ longitude }}</ion-label>
        </ion-item>
  
        <!-- List of saved locations -->
        <ion-list>
          <ion-item v-for="(location, index) in locations" :key="index">
            <ion-label>
              Position {{ index + 1 }}: Latitude {{ location.latitude }}, Longitude {{ location.longitude }}
            </ion-label>
          </ion-item>
        </ion-list>
  
        <!-- Add location, Logout, and Clear buttons -->
        <ion-button expand="block" @click="addLocation">AJOUTER EMPLACEMENT</ion-button>
        <ion-button expand="block" color="danger" @click="logout">DÉCONNECTER</ion-button>
        <ion-button expand="block" color="warning" @click="clearLocations">ÉFFACER TOUT</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,
    IonList,
  } from '@ionic/vue';  // Import necessary Ionic components
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonItem,
      IonLabel,
      IonButton,
      IonList,
    },
    setup() {
      const latitude = ref<number | null>(null);  // For current latitude
      const longitude = ref<number | null>(null); // For current longitude
      const locations = ref<{ latitude: number; longitude: number }[]>([]);  // List of saved locations
      const router = useRouter();
  
      // Get the user's current position
      const getCurrentPosition = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              latitude.value = position.coords.latitude;
              longitude.value = position.coords.longitude;
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
  
      // Add the current position to the list
      const addLocation = () => {
        if (latitude.value !== null && longitude.value !== null) {
          locations.value.push({ latitude: latitude.value, longitude: longitude.value });
        }
      };
  
      // Clear the list of locations
      const clearLocations = () => {
        locations.value = [];
      };
  
      // Log the user out and redirect to the login page
      const logout = () => {
        // Implement the logic for logging out the user (e.g., clear session, token)
        router.push('/login');
      };
  
      // Get the current position on component mount
      onMounted(() => {
        getCurrentPosition();
      });
  
      return {
        latitude,
        longitude,
        locations,
        addLocation,
        clearLocations,
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  ion-item {
    margin-bottom: 15px;
  }
  
  ion-label {
    color: black;
  }
  </style>
  