<script>
    import { blur, slide } from 'svelte/transition';
    import Aufgabe from './Aufgabe.svelte';
    import { aufgaben } from '../stores/stores.js';
    import ListeAPI from '../stores/listeAPI.js';

    let unerledigt = $aufgaben.filter(aufgabe => aufgabe.erledigt === false).length;
    let aufgabenSortiert = [];

    $: {
        aufgabenSortiert = [...$aufgaben];
        aufgabenSortiert.sort((a, b) => (a.erledigt && b.erledigt) ? 0 : ((a.erledigt) ? 1 : -1));
    }

    const update = (e) => {
        console.log(e.detail); // todo: remove before merge!
        const index = $aufgaben.findIndex(aufgabe => aufgabe.id === e.detail.id);
        $aufgaben[index] = e.detail;
        ListeAPI.speichern($aufgaben);
    }
</script>

<style>
    .tabelle {
        padding: 7px;
        border-bottom: 1px solid #cecece;
    }
</style>

<div class="container" transition:blur={{amount: 5, delay: 400}}>
    <input type="range" bind:value={unerledigt} max="{$aufgaben.length}">
    <div class="box">
        {#each aufgabenSortiert.slice(0, unerledigt) as aufgabe(aufgabe)}
            <div class="tabelle" transition:slide>
                <Aufgabe {...aufgabe} on:update={update}/>
            </div>
            {:else}
            <p>Alles erledigt</p>
        {/each}
    </div>
</div>