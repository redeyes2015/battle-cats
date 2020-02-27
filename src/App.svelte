<script>
    import EnemySelector from './EnemySelector.svelte'
    import enemies from '../json/enemies.json';
    import ShowStages from './ShowStages.svelte';

    let selectedEnemies = [];
    let selectedChapter = 'all';
    let searchText = '';

    function clearSelect () {
        selectedEnemies = [];
        selectedChapter = 'all';
        searchText = '';
    }
</script>

<EnemySelector allEnemies="{enemies}"
               bind:selectedEnemies={selectedEnemies}
               bind:searchText={searchText} />

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

