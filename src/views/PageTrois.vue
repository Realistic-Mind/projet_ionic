<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Page 3</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Input for Name -->
      <ion-item>
        <ion-label>Nom: </ion-label>
        <ion-input v-model="monNom" placeholder="Entrez votre nom"></ion-input>
      </ion-item>

      <!-- Select for Gender -->
      <ion-item>
        <ion-label>Genre</ion-label>
        <ion-select placeholder="choisir" v-model="monGenre">
          <ion-select-option value="Femme">Femme</ion-select-option>
          <ion-select-option value="Homme">Homme</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Button to trigger the alert -->
      <ion-button @click="afficheDialogue">Afficher</ion-button>
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
  alertController
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
  },
  data() {
    return {
      monNom: "", // Holds the entered name
      monGenre: "", // Holds the selected gender
    };
  },
  methods: {
    async afficheDialogue() {
      const alert = await alertController.create({
        header: 'Mon alerte',
        subHeader: 'Votre Nom est:',
        message: this.monNom + " " + this.monGenre,
        buttons: ['OK', 'Cancel', 'More'],
      });
      await alert.present();
    }
  }
});
</script>

<style scoped>
.milieu {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
