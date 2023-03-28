export function setClassToMain(newClass) {
    const allClasses = ['search', 'search_active', 'search_live', 'search_not_found', 'scroll']
    const main = document.querySelector('main');
    main.classList.remove(...allClasses);
    main.classList.add(newClass);
}
