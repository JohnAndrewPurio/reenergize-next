export const toggleDarkMode = (state: boolean) => {
    document.body.classList.toggle("dark", state)
}