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
      <ion-item>
        <ion-label>Nom: </ion-label>
        <ion-input v-model="monNom"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Genre</ion-label>
        <ion-select placeholder="choisir" v-model="monGenre">
          <ion-select-option value="Femme">Femme</ion-select-option>
          <ion-select-option value="Homme">Homme</ion-select-option>
        </ion-select>
      </ion-item>

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
      monNom: '',
      monGenre: '',
    };
  },
  methods: {
    async afficheDialogue() {
      const message = `Nom: ${this.monNom}, Genre: ${this.monGenre}`;
      console.log("Mon alerte");
      const alert = await alertController.create({
        header: 'Mon alerte',
        subHeader: 'Sous titre',
        message: message,
        buttons: ['OK', 'Cancel'],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss: ', role);
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
