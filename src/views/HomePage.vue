<template>
<ion-page>
<ion-header>
<ion-toolbar color="primary">
<ion-title>Home</ion-title>
</ion-toolbar>
</ion-header>

<ion-content>
<div class="ion-text-center">
<p>Page d'accueil</p>
<ion-button expand="block" color="medium" target=_blank href="/pageUn">
Page 1
</ion-button>
<ion-button expand="block" color="medium" target=_blank href="/pageDeux">
Page 2
</ion-button>
<ion-button expand="block" color="medium" target=_blank href="/pageTrois">
Page 3
</ion-button>

<ion-button expand="block" color="medium" target=_blank href="/pageQuatre">
Page 4
</ion-button>
</div>
</ion-content>

<ion-footer>
<ion-toolbar color="secondary">
<ion-title>Pied de page</ion-title>
</ion-toolbar>
</ion-footer>
</ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
components: {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonFooter,
IonButton
}
});
</script>

<style scoped>
</style>