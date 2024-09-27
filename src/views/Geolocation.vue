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
  
        <!-- List of saved locations with latitude, longitude, and address -->
        <ion-list>
          <ion-item v-for="(location, index) in locations" :key="index">
            <ion-label>
              <div>Position {{ index + 1 }}:</div>
              <div>Latitude: {{ location.latitude }}</div>
              <div>Longitude: {{ location.longitude }}</div>
              <div>{{ location.house_number }} {{ location.road }}, {{ location.suburb }}, {{ location.city }}, {{ location.state }}, {{ location.postcode }}, {{ location.country }}</div>
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
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { getCurrentPosition, fetchAddress } from '../services/locationService'; // Import the service
  
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
      const address = ref<{ house_number?: string; road?: string; suburb?: string; city?: string; state?: string; postcode?: string; country?: string; } | null>(null);   // To store the full address
      const locations = ref<{ latitude: number; longitude: number; house_number?: string; road?: string; suburb?: string; city?: string; state?: string; postcode?: string; country?: string; }[]>([]);  // List of saved locations
      const router = useRouter();
  
      // Get the user's current position
      const loadCurrentPosition = async () => {
        try {
          const position = await getCurrentPosition();
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
  
          // Fetch the full address using the service
          const fetchedAddress = await fetchAddress(latitude.value, longitude.value);
          address.value = fetchedAddress;
        } catch (error) {
          console.error('Error getting position or fetching address:', error);
        }
      };
  
      // Add the current position and address to the list
      const addLocation = () => {
        if (latitude.value !== null && longitude.value !== null && address.value !== null) {
          locations.value.push({
            latitude: latitude.value,
            longitude: longitude.value,
            ...address.value
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
        loadCurrentPosition();
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
  