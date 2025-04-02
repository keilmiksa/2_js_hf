$(document).ready(function() {
    let currentIndex = 0; // A jelenleg kiválasztott kép indexét tárolja
    const images = $('.gallery-image img').map(function() {
        // Az összes képfájl elérési útját összegyűjti egy tömbbe
        return $(this).attr('src');
    }).get();

    // Frissíti a modal ablakban látható képet az aktuális index alapján
    function updateModalImage() {
        $('#modal-image').attr('src', images[currentIndex]);
    }

    // Ha egy képre kattintunk, megnyitja a modal ablakot és beállítja a nagyított képet
    $('.gallery-image img').on('click', function() {
        currentIndex = images.indexOf($(this).attr('src')); // Meghatározza a kattintott kép indexét
        updateModalImage(); // Frissíti a modal ablakban a képet
        $('#modal').removeClass('hidden'); // Megjeleníti a modal ablakot
    });

    // Előző kép megjelenítése (balra nyíl)
    $('#prev-btn').on('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Az előző kép indexének kiszámítása
        updateModalImage(); // Frissíti a modal ablakban a képet
    });

    // Következő kép megjelenítése (jobbra nyíl)
    $('#next-btn').on('click', function() {
        currentIndex = (currentIndex + 1) % images.length; // A következő kép indexének kiszámítása
        updateModalImage(); // Frissíti a modal ablakban a képet
    });

    // Modal bezárása a "Bezárás" gomb segítségével
    $('#close-btn').on('click', function() {
        $('#modal').addClass('hidden'); // Elrejti a modal ablakot
    });

    // Képek előtöltése, hogy gyorsabban jelenjenek meg
    function preloadImages(imageArray) {
        imageArray.forEach(function(src) {
            const img = new Image();
            img.src = src; // Minden kép forrását betölti a böngészőbe
        });
    }
    
    // Az előtöltési funkció meghívása az összes galéria kép forrására
    const imageSources = $('.gallery-image img').map(function() {
        return $(this).attr('src');
    }).get();
    preloadImages(imageSources); // Előtöltés elindítása

    let startX = 0; // Az érintés kezdő pozíciójának tárolása
    let endX = 0;   // Az érintés végpozíciójának tárolása

    // Touch start esemény: az ujj érintése a képernyőhöz
    $('#modal').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX; // Érintés kezdő vízszintes koordinátája
    });

    // Touch end esemény: az ujj felemelése a képernyőről
    $('#modal').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX; // Érintés vége vízszintes koordinátája
        handleSwipe(); // Meghívja a húzáskezelő logikát
    });

    // Húzáskezelő logika
    function handleSwipe() {
        const swipeDistance = startX - endX; // Kiszámolja a húzás távolságát és irányát

        if (swipeDistance > 50) {
            // Balra húzás: következő kép
            currentIndex = (currentIndex + 1) % images.length; // Következő kép indexének kiszámítása
            updateModalImage(); // Frissíti a modal ablakban a képet
        } else if (swipeDistance < -50) {
            // Jobbra húzás: előző kép
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Előző kép indexének kiszámítása
            updateModalImage(); // Frissíti a modal ablakban a képet
        }
    }
});
