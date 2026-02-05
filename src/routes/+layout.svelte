<script>
    import Header from "$lib/components/Header.svelte";
</script>

<Header></Header>

<slot></slot>

<style>
    :global(a) {
        text-decoration: none;
        color: inherit; /* Optional: to keep the link color consistent with surrounding text */
    }

    :global(a:hover) {
        color: #007bff; /* Optional: change color on hover */
    }

    :global(a:visited) {
        color: inherit; /* Optional: change color for visited links */
    }
</style>