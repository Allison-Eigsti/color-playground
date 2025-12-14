export function navMenuToggle({
    navToggle,
    primaryNav,
    openIcon,
    closeIcon
}) {
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (primaryNav.hasAttribute('data-visible')) {
                navToggle.setAttribute('aria-expanded', false);
            }
            navToggle.setAttribute('aria-expanded', true);
            primaryNav.toggleAttribute('data-visible');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');   
        })
    }
}