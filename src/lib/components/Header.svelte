<section class="header-area">
  <div class="site-name">Svelte Blog</div>
</section>

<style>
  .header-area {
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-default);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 100;
  }

  .site-name {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
    transition: color 0.2s ease;
  }

  .site-name:hover {
    color: var(--text-accent);
  }

  /* Responsiv: mindre skjermer */
  @media (max-width: 768px) {
    .header-area {
      padding: 1rem;
    }

    .site-name {
      font-size: clamp(1.3rem, 6vw, 2rem);
    }
  }
</style>