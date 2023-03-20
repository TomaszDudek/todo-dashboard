<script>
    import { aufgaben } from '../stores/stores.js';
    import ListeAPI from '../stores/listeAPI.js';
    import { fly } from 'svelte/transition'

    const bearbeiten = (id) => {
        ListeAPI.speichern($aufgaben);
    }

    const loeschen = (id) => {
        const ok = confirm('Soll wirklich gelöscht werden?');

        if (ok) {
            $aufgaben = $aufgaben.filter(aufgabe => aufgabe.id != id);
            ListeAPI.speichern($aufgaben);
        }
    }
</script>

<div class="container">
    <div class="columns is-multiline">
        {#each $aufgaben as aufgabe(aufgabe)}
            <div class="column is-one-third">
                <div class="card"
                     in:fly='{{y: -200, duration: 500, delay: 500}}'
                     out:fly="{{y: 250, duration: 500}}">
                    <header class="card-header">
                        <button class="delete is-small" on:click={() => loeschen(aufgabe.id)}></button>
                        <div class="level">
                            <p class="card-header-title"
                               contenteditable="true"
                               on:keyup={() => {bearbeiten(aufgabe.id)}}
                               bind:innerHTML={aufgabe.title}>
                                {aufgabe.title}
                            </p>
                            <input type="checkbox"
                                   class="checkbox"
                                   on:blur={() => {bearbeiten(aufgabe.id)}}
                                   bind:checked={aufgabe.erledigt}>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <textarea class="textarea"
                                      on:blur={() => {bearbeiten(aufgabe.id)}}
                                      bind:value={aufgabe.inhalt}></textarea>
                        </div>
                    </div>
                </div>
                <!--{JSON.stringify(aufgabe)}-->
            </div>
            {:else}
            <h1 class="title is-4 mt-4">Keine Aufgaben vorhanden</h1>
        {/each}
    </div>
</div>

<style>
    .level {
        margin-right: 10px;
        width: 100%;
    }

    .card:focus-within {
        background-color: lightcyan;
        transition: background-color 600ms ease;
    }
</style>