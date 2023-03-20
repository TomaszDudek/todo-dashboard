<script>
    import {aufgaben} from '../stores/stores.js';
    import ListeAPI from '../stores/listeAPI.js';
    import {v4 as uuidv4 } from 'uuid';
    import { fade } from 'svelte/transition';

    let titel = '';
    let inhalt = '';
    let formularSichtbar = '';

    export const formularAnzeigen = () => {
        formularSichtbar = 'is-active';
    }

    const formularSchliessen = () => {
      formularSichtbar = '';
    }

    const speichereFormular = () => {
        if (titel.trim() === '' || inhalt.trim() === '') { return }
        $aufgaben = [{
            id: uuidv4(),
            title: titel,
            inhalt: inhalt,
            erledigt: false
        }, ...$aufgaben];
        console.log('$aufgaben', $aufgaben); // todo: remove before merge!
        ListeAPI.speichern($aufgaben);
        titel = '';
        inhalt = '';
        formularSichtbar = '';
    }
</script>

{#if formularSichtbar}
    <div class="modal {formularSichtbar}" transition:fade>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <form on:submit|preventDefault={speichereFormular}>
                    <div class="field mb-4">
                        <div class="control mb-2">
                            <input type="text" class="input" placeholder="Titel" bind:value={titel}>
                        </div>
                        <div class="control">
                            <textarea class="textarea" placeholder="Inhalt" bind:value={inhalt}></textarea>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" class="button is-primary">Speichern</button>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-danger" on:click={formularSchliessen}>Abbrechen</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <button on:click={formularSchliessen} class="modal-close is-large" aria-label="close"></button>
    </div>
{/if}