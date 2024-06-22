function searchMovies() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const movies = document.getElementsByClassName('movie');
    
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].innerText.toLowerCase().includes(input)) {
            movies[i].style.display = '';
        } else {
            movies[i].style.display = 'none';
        }
    }
}
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const button = document.getElementById('toggle-button');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'LIGHT MODE';
    } else {
        button.textContent = 'DARK MODE';
    }
}

// Initialize with light mode
document.body.classList.add('light-mode');