class MainFrame extends HTMLElement {
  connectedCallback() {
    const pageId = this.getAttribute('id');
    const shadow = this.attachShadow({ mode: 'open' });
    const hasAside = this.classList.contains('with-aside');

    const asideHTML = hasAside ? `
      <aside class="flex w-20 h-full bg-[var(--color-secondary)] p-4">
        <slot name="aside"></slot>
      </aside>
    ` : '';

    shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
      </style>

      <link rel="stylesheet" href="../assets/css/output.css">
      
      <header class="flex items-center bg-[var(--color-secondary)] h-20 px-4 shrink-0">
        <img class="h-16 w-16 mr-4" src="../assets/img/Logo.svg" alt="Logo" />
        <h1 class="text-xl lg:text-3xl font-sans text-[var(--color-fifth)]">${pageId}</h1>
      </header>
      
      <main class="flex-1 overflow-auto flex">
        <section class="flex-grow flex flex-col flex-1 items-center px-4 md:px-10 lg:px-20 xl:px-30 pt-6 overflow-auto">
          <slot></slot> 
        </section>
        ${asideHTML}
      </main>
    `;
  }
}

if (!customElements.get('main-frame')) {
    customElements.define('main-frame', MainFrame);
}