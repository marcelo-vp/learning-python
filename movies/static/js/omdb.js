// Handles movie search on OMDB database

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const submitButton = document.getElementById('submit-button');
        submitButton.onclick = e => {
            e.preventDefault();
            document.querySelector('.movie-section').style.display = 'none';
    
            const path = document.getElementById('movie-search-form').getAttribute('action');
            const movieNameInput = document.getElementById('movie-name');
            const movieName = movieNameInput.value;
    
            if (!movieName) {
                movieNameInput.setAttribute('placeholder', 'Enter a movie name');
                return;
            }
            if (movieNameInput.getAttribute('placeholder')) {
                movieNameInput.setAttribute('placeholder', '');
            }
    
            const payload = { "movie_name": movieName };
            makePostRequest(path, payload, successCallback);
        }
    });
    
    const successCallback = response => {
        const movieData = JSON.parse(response);
        const movieSection = document.querySelector('.movie-section');
        const errorSection = document.querySelector('.error-section');
    
        if (movieData['has_error']) {
            movieSection.style.display = 'none';
            document.querySelector('.error-message').textContent = movieData['error'];
            document.querySelector('.error-image').setAttribute(
                'src', '../static/img/not-found.svg'
            );
            errorSection.style.display = 'block';
        }
        else {
            errorSection.style.display = 'none';
            document.querySelector('.movie-title').textContent = movieData['Title'];
            document.querySelector('.movie-image').setAttribute('src', movieData['Poster']);
            document.querySelector('.movie-plot').textContent = movieData['Plot'];
            movieSection.style.display = 'block';
            document.getElementById('movie-name').value = '';
        }
    }
})();
