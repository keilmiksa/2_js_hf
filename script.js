$(document).ready(function() {
    let currentIndex = 0;
    const images = $('.gallery-image img').map(function() {
        return $(this).attr('src');
    }).get();

    function updateModalImage() {
        $('#modal-image').attr('src', images[currentIndex]);
    }

    $('.gallery-image img').on('click', function() {
        currentIndex = images.indexOf($(this).attr('src'));
        updateModalImage();
        $('#modal').removeClass('hidden');
    });

    $('#prev-btn').on('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalImage();
    });

    $('#next-btn').on('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalImage();
    });

    $('#close-btn').on('click', function() {
        $('#modal').addClass('hidden');
    });

    function preloadImages(imageArray) {
        imageArray.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });
    }
    
    $(document).ready(function() {
        const imageSources = $('.gallery-image img').map(function() {
            return $(this).attr('src');
        }).get();
        preloadImages(imageSources);
    });

let startX = 0;
let endX = 0;

    // Touch start esemény (ujj érintése a képernyőhöz)
    $('#modal').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX; // Az érintés kezdő pozíciója
    });

    // Touch end esemény (ujj felemelése a képernyőről)
    $('#modal').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX; // Az érintés végpozíciója
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = startX - endX;

        if (swipeDistance > 50) {
            // Balra húzás: következő kép
            currentIndex = (currentIndex + 1) % images.length;
            updateModalImage();
        } else if (swipeDistance < -50) {
            // Jobbra húzás: előző kép
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModalImage();
        }
    }

});

