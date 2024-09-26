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
  
        <!-- Display full address (street, city, country, etc.) -->
        <ion-item v-if="address">
          <ion-label>Address: {{ address }}</ion-label>
        </ion-item>
  
        <!-- List of saved locations -->
        <ion-list>
          <ion-item v-for="(location, index) in locations" :key="index">
            <ion-label>
              Position {{ index + 1 }}: {{ location.address }}
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
  import axios from 'axios';
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
      const address = ref<string | null>(null);   // To store the full address
      const locations = ref<{ latitude: number; longitude: number; address: string }[]>([]);  // List of saved locations
      const router = useRouter();
  
      // Get the user's current position
      const getCurrentPosition = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              latitude.value = position.coords.latitude;
              longitude.value = position.coords.longitude;
  
              // Fetch the full address using reverse geocoding
              await fetchAddress(latitude.value, longitude.value);
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
  
      // Fetch the full address from the Nominatim API (OpenStreetMap)
      const fetchAddress = async (lat: number, lon: number) => {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              lat,
              lon,
              format: 'json',
            },
          });
          const result = response.data;
          address.value = result.display_name; // This contains the full address (street, city, country, etc.)
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };
  
      // Add the current position and address to the list
      const addLocation = () => {
        if (latitude.value !== null && longitude.value !== null && address.value !== null) {
          locations.value.push({
            latitude: latitude.value,
            longitude: longitude.value,
            address: address.value,
          });
        }
      };
  
      // Clear the list of locations
      const clearLocations = () => {
        locations.value = [];
      };
  
      // Log the user out and redirect to the login page
      const logout = () => {
        router.push('/login');
      };
  
      // Get the current position on component mount
      onMounted(() => {
        getCurrentPosition();
      });
  
      return {
        latitude,
        longitude,
        address,
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
  