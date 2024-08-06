let isDragging = false;
let startX, startY;

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);

function handleTouchStart(event) {
    if (event.target.classList.contains('plant')) {
        isDragging = true;
        dragged = event.target;
        startX = event.touches[0].clientX - event.target.offsetLeft;
        startY = event.touches[0].clientY - event.target.offsetTop;
    }
}

function handleTouchMove(event) {
    if (!isDragging) return;
    event.preventDefault();
    
    let touch = event.touches[0];
    let garden = document.getElementById('garden');
    let newX = touch.clientX - startX - garden.offsetLeft;
    let newY = touch.clientY - startY - garden.offsetTop;

    newX = Math.max(0, Math.min(newX, garden.offsetWidth - dragged.offsetWidth));
    newY = Math.max(0, Math.min(newY, garden.offsetHeight - dragged.offsetHeight));

    dragged.style.left = newX + 'px';
    dragged.style.top = newY + 'px';
}

function handleTouchEnd(event) {
    if (!isDragging) return;
    isDragging = false;

    let garden = document.getElementById('garden');
    if (dragged.parentElement !== garden) {
        const newPlant = dragged.cloneNode(true);
        newPlant.classList.add('dragged-plant');
        newPlant.style.position = 'absolute';
        newPlant.style.left = dragged.style.left;
        newPlant.style.top = dragged.style.top;
        newPlant.addEventListener("click", selectPlant);
        garden.appendChild(newPlant);
    }

    dragged.style.left = '';
    dragged.style.top = '';
}