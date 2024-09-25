<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Page 7</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-item>
          <!-- path to assets -->
          <ion-img src="/src/assets/img/small-apple-icon.png"></ion-img>
        </ion-item>
        <ion-item>
          <!-- Using dynamic src for image -->
          <ion-img :src="imageSrc"></ion-img>
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
    IonImg,
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
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
      IonImg,
    },
    data() {
      return {
        // External image source
        imageSrc: "http://openweathermap.org/img/wn/10d@2x.png",
      };
    },
  });
  </script>
  