<script>
    import '../node_modules/bulma/css/bulma.min.css';
    import ListeAPI from './stores/listeAPI.js';
    import { onMount } from 'svelte'
    import Navbar from "./lib/Navbar.svelte";
    import { aufgaben } from './stores/stores.js';
    import Liste from './lib/Liste.svelte';
    import Tabelle from './lib/Tabelle.svelte';
    import Router from 'svelte-spa-router'

    onMount(async () => {
        $aufgaben = await ListeAPI.laden();
    });

    $: aufgabenAnzahl = $aufgaben.length;
    $: aufgabenAnzahlErledigt = $aufgaben.filter(n => n.erledigt).length;
</script>

<svelte:head>
    <title>Dashboard {aufgabenAnzahlErledigt} / {aufgabenAnzahl}</title>
</svelte:head>

<Navbar>Todo Liste {aufgabenAnzahlErledigt} / {aufgabenAnzahl}</Navbar>

<Router routes= {{
    '/': Liste,
    '/tabelle' : Tabelle
}} />

