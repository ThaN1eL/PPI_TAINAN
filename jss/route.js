document.addEventListener('DOMContentLoaded', function() {
    // Redirect to index.html
    document.querySelectorAll('#landing,#landing2').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'index.html';
        });
    });

});

document.querySelectorAll('#about').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault(); 
        window.location.href = 'about.html'; 
    });

document.querySelectorAll('#news').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault(); 
        window.location.href = 'news.html'; 
    });

})});