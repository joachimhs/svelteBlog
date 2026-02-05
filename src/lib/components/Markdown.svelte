<script lang="ts">
    import {marked} from "marked";

    let {
        toHtml
    } = $props();

    marked.use({
        mangle: false,
        headerIds: false
    });
</script>

{#if toHtml}
    {@html marked(toHtml) }
{/if}