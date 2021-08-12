let images = [
    'https://images.wallpaperscraft.ru/image/futbol_myach_dvizhenie_voda_abstrakciya_79989_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/velosipedisty_solntse_nebo_zakat_102236_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/ganteli_sport_sportzal_106546_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/derevya_skeytbord_paren_skeyt_ulica_81215_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/sportsmen_sport_sportivnyj_muzhchina_118731_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/basketbol_myach_basketbolnoe_pole_120082_1920x1080.jpg',
]

let selectedImage = document.getElementById("image");
let changed;
let a = 0;
let opacityCounter = 1
const timerId = setInterval(() => {
    const timerId2 = setInterval(() => {
        if (opacityCounter <= 0) {
            selectedImage.src = images[a]
            changed = true;
            if (changed) {
                const timerId3 = setInterval(() => {
                    if (Math.floor(opacityCounter) == 1) {
                        changed = false;
                        a++;
                        clearInterval(timerId3);
                    }
                    opacityCounter += 0.01;
                    selectedImage.style.opacity = opacityCounter.toFixed(2) + "";
                }, 10);
            }
            clearInterval(timerId2);
        }
        opacityCounter -= 0.01;
        selectedImage.style.opacity = opacityCounter.toFixed(2) + "";
    }, 10);
    if (a == images.length - 1) {
        a = 0;
    }
}, 5000);