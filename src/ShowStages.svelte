<script>
    import stages from '../json/stages.json';

    export let selectedEnemies = [];
    export let selectedChapter = 'all'

    $: chapterFilter = selectedChapter == 'all' ?
        () => true :
        (s) => s.chapter == selectedChapter;

    $: enemyFilter = s => s.enemies.some(
        id => selectedEnemies.some(e => e.id == id)
    );

    $: shownStages = stages.filter(
        s => chapterFilter(s) && enemyFilter(s)
    );
</script>

{#if (selectedEnemies.length > 0)}
<table border="1">
    {#each shownStages as stage}
    <tr>
        <td>{stage.chapter}</td>
        <td>{stage.stageOrder}</td>
        <td>{stage.stageName}</td>
        <td>
        {#each stage.enemies as enemyId, index}
            {index === 0 ? '' : '、' }{
            #if selectedEnemies.some(e => e.id == enemyId)
                }<b>{enemyId}</b>{
            :else
                }<span>{enemyId}</span>{
            /if}
        {/each}
        </td>
    </tr>
    {/each}
</table>
{/if}
