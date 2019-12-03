<script>
    import {createEventDispatcher} from 'svelte';

    export let allEnemies = [];
    export let selectedEnemies = [];

    let searchText = '';

    $: shownEnemies = searchText === '' ?
        [] :
        allEnemies.filter(e => {
            return ['jpName', 'twName', 'id']
                .some(f => e[f].includes(searchText));
        }).map(e => ({
            ...e,
            selected: selectedEnemies.some(s => s.id == e.id)
        }));

    const dispatch = createEventDispatcher();
</script>

<label for="find-enemy">敵人: </label><input name="find-enemy" bind:value={searchText} />

<table border="1">
{#each shownEnemies as enemy (enemy.index)}
    <tr>
        <td>{enemy.index}</td>
        <td>{enemy.jpName}</td>
        <td>{enemy.twName}</td>
        <td>{enemy.id}</td>
        <td>{enemy.trait}</td>
        <td>
        {#if enemy.selected}
            <button on:click="{() => dispatch('deselect', enemy) }">&#x2714;&#xfe0f;</button>
        {:else}
            <button on:click="{() => dispatch('select', enemy) }">Add</button>
        {/if}
        </td>
    </tr>
{/each}
</table>

