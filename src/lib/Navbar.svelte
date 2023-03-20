<script>
    import Formular from './Formular.svelte';
    import Router from 'svelte-spa-router'
    import {link} from 'svelte-spa-router'
    import active from 'svelte-spa-router/active'

    let form;
</script>

<section class="hero is-primary welcome is-small">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">
                Dashboard
            </h1>
            <h2 class="subtitle">
                <slot></slot>
            </h2>
        </div>
    </div>
</section>

<div class="box">
    <div class="container">
        <div class="field is-grouped">
            <button on:click={() => { form.formularAnzeigen() }} class="button">Neu</button>
            <div class="tabs">
                <ul>
                    <li><a use:link use:active href="/">Karten</a></li>
                    <li><a use:link use:active href="/tabelle">Tabelle</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<Formular bind:this={form}/>

<style>
    :global(a.active) {
        background-color: rgba(0, 209, 178, 0.75);
    }
</style>