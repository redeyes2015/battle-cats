<script>
    import EnemySelector from './EnemySelector.svelte'
    import enemies from '../json/enemies.json';
    import ShowStages from './ShowStages.svelte';

    let selectedEnemies = [];
    let selectedChapter = 'all';
    let searchText = '';

    function select ({id}) {
        const newPick = enemies.find(e => e.id == id);
        if (selectedEnemies.every(e => e.id != id)) {
            selectedEnemies = [...selectedEnemies, newPick];
        }
    }
    function deselect (enemy) {
        selectedEnemies = selectedEnemies.filter(e => e.id != enemy.id);
    }
    function clearSelect () {
        selectedEnemies = [];
        selectedChapter = 'all';
        searchText = '';
    }

</script>

<EnemySelector allEnemies="{enemies}"
               {selectedEnemies}
               bind:searchText={searchText}
               on:select="{(event) => select(event.detail)}"
               on:deselect="{(event) => deselect(event.detail)}" />

{#if selectedEnemies.length > 0}
<p>
已選: {selectedEnemies.map(e => e.id).join("，")}
</p>
{/if}

<p>
關卡:
<select bind:value={selectedChapter}>
    <option value="all">不限</option>
    <option>傳說</option>
    <option>世界一</option>
    <option>世界二</option>
    <option>世界三</option>
    <option>未來一</option>
    <option>未來二</option>
    <option>未來三</option>
    <option>宇宙一</option>
    <option>宇宙二</option>
    <option>宇宙三</option>
</select>
</p>

<p>
    <button role="button" on:click="{clearSelect}">清除</button>
</p>

<ShowStages {selectedEnemies} {selectedChapter} />

