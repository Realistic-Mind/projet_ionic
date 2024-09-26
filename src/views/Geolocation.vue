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
  
        <!-- Display full address components -->
        <ion-item v-if="address">
          <ion-label>
            Address: {{ address.house_number }} {{ address.road }}, {{ address.suburb }}, {{ address.city }}, {{ address.state }}, {{ address.postcode }}, {{ address.country }}
          </ion-label>
        </ion-item>
  
        <!-- List of saved locations -->
        <ion-list>
          <ion-item v-for="(location, index) in locations" :key="index">
            <ion-label>
              Position {{ index + 1 }}: {{ location.house_number }} {{ location.road }}, {{ location.suburb }}, {{ location.city }}, {{ location.state }}, {{ location.postcode }}, {{ location.country }}
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
  } from '@ionic/vue';
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
      const address = ref<{ 
        house_number?: string; road?: string; suburb?: string; city?: string; 
        state?: string; postcode?: string; country?: string; } | null>(null);   // To store the full address
      const locations = ref<{ 
        house_number?: string; road?: string; suburb?: string; city?: string; 
        state?: string; postcode?: string; country?: string; }[]>([]);  // List of saved locations
      const router = useRouter();
  
      // Get the user's current position
      const getCurrentPosition = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              latitude.value = position.coords.latitude;
              longitude.value = position.coords.longitude;
  
              // Fetch the full address using Nominatim API
              await fetchAddress(latitude.value, longitude.value);
            },
            (error) => {
              console.error('Error getting location:', error);
            },
            {
              enableHighAccuracy: true,  // Request more accurate coordinates
              timeout: 10000,            // Timeout after 10 seconds
              maximumAge: 0              // Do not use cached position
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
  
      // Fetch the full address from Nominatim (OpenStreetMap) API
      const fetchAddress = async (lat: number, lon: number) => {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              lat,
              lon,
              format: 'json',
              addressdetails: 1,  // Ensure we get detailed address components
            },
          });
          const result = response.data.address;
          address.value = {
            house_number: result.house_number || 'Unknown',
            road: result.road || 'Unknown street',
            suburb: result.suburb || result.neighbourhood || 'Unknown suburb',
            city: result.city || result.town || result.village || 'Unknown city',
            state: result.state || 'Unknown state',
            postcode: result.postcode || 'Unknown postcode',
            country: result.country || 'Unknown country',
          };
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };
  
      // Add the current position and address to the list
      const addLocation = () => {
        if (address.value !== null) {
          locations.value.push({ ...address.value });
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
  