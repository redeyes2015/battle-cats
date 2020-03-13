<script>

    export let allEnemies = [];
    export let selectedEnemies = [];
    export let searchText = '';

    $: shownEnemies = searchText === '' ?
        [] :
        allEnemies.filter(e => {
            return ['jpName', 'twName', 'id']
                .some(f => e[f].includes(searchText));
        }).map(e => ({
            ...e,
            selected: selectedEnemies.some(s => s.id == e.id)
        }));

    function select ({id}) {
        const newPick = allEnemies.find(e => e.id == id);
        if (selectedEnemies.every(e => e.id != id)) {
            selectedEnemies = [...selectedEnemies, newPick];
        }
    }
    function deselect ({id}) {
        selectedEnemies = selectedEnemies.filter(e => e.id != id);
    }
</script>

<label for="find-enemy">敵人: </label><input id="find-enemy" bind:value={searchText} />

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
            <button on:click="{() => deselect(enemy) }">&#x2714;&#xfe0f;</button>
        {:else}
            <button on:click="{() => select(enemy) }">Add</button>
        {/if}
        </td>
    </tr>
{/each}
</table>

