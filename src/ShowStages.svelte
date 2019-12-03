<script>
    import stages from '../json/stages.json';

    export let selectedEnemies = [];
    export let selectedChapter = 'all'

    $: chapterFilter = selectedChapter == 'all' ?
        () => true :
        (s) => s.chapter == selectedChapter;

    $: countSelectedEnemy = stage => selectedEnemies.filter(enemy =>
        stage.enemies.some(id => id == enemy.id)
    ).length;

    $: stageGroups = stages
        .filter(chapterFilter)
        .reduce((groups, stage) => {
            const matchedEnemyCount = countSelectedEnemy(stage);
            if (!groups.has(matchedEnemyCount)) {
                groups.set(matchedEnemyCount, []);
            }
            groups.get(matchedEnemyCount).push(stage);
            return groups;
        }, new Map());

    $: stageGroupEntries = [...stageGroups.entries()]
        .filter(([count]) => count > 0)
        .sort(([countA], [countB]) => countB - countA);
</script>
<style>
.matched {
    color: red;
}
</style>

{#each stageGroupEntries as stageEntry}
    <p>Count {stageEntry[0]}</p>
    <table border="1">
        {#each (stageEntry[1]) as stage}
        <tr>
            <td>{stage.chapter}</td>
            <td>{stage.stageOrder}</td>
            <td>{stage.stageName}</td>
            <td>
            {#each stage.enemies as enemyId, index}
                {index === 0 ? '' : '、' }{
                #if selectedEnemies.some(e => e.id == enemyId)
                    }<span class="matched">{enemyId}</span>{
                :else
                    }<span>{enemyId}</span>{
                /if}
            {/each}
            </td>
        </tr>
        {/each}
    </table>
{/each}
