<script>
    import {createEventDispatcher} from 'svelte';
    export let id, title, inhalt, erledigt;
    let dispatch = createEventDispatcher();

    const update = () => {
        dispatch('update', {id, title, inhalt, erledigt});
    }
</script>

<style>
    .aufgabe {
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 5px;
        transition: background-color 500ms;
    }

    .aufgabe.erledigt {
        background-color: rgba(0, 209, 178, 0.1);
        text-decoration: line-through;
    }

    .text-input {
        flex-grow: 1;
        font-size: 1em;
    }

    .checkbox-erledigt {
        margin-left: 50px ;
    }
</style>

<div class="aufgabe" class:erledigt>
    <h1 class="text-input">{title}: {inhalt}</h1>
    <input type="checkbox" class="checkbox-erledigt" bind:checked={erledigt} on:change={() => update()}>
</div>