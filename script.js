let dragged;
let selectedPlant = null;

document.addEventListener("dragstart", function(event) {
    dragged = event.target;
    event.dataTransfer.setData('text/plain', event.target.alt);
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.getElementById("garden").addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.id === "garden") {
        const plantName = event.dataTransfer.getData('text');
        const newPlant = document.createElement('img');
        newPlant.src = `${plantName}.jpg`;
        newPlant.alt = plantName;
        newPlant.className = 'dragged-plant';
        newPlant.style.left = (event.clientX - event.target.offsetLeft) + "px";
        newPlant.style.top = (event.clientY - event.target.offsetTop) + "px";
        newPlant.addEventListener("click", selectPlant);
        event.target.appendChild(newPlant);
    }
});

function selectPlant(event) {
    if (selectedPlant) {
        selectedPlant.style.border = "none";
    }
    selectedPlant = event.target;
    selectedPlant.style.border = "2px solid red";
    showControls(selectedPlant);
}

function showControls(plant) {
    let controls = document.querySelector('.controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.className = 'controls';
        controls.innerHTML = `
            <button onclick="rotatePlant(-15)">↺</button>
            <button onclick="rotatePlant(15)">↻</button>
            <button onclick="resizePlant(1.1)">+</button>
            <button onclick="resizePlant(0.9)">-</button>
            <button onclick="removePlant()">🗑️</button>
        `;
        document.body.appendChild(controls);
    }
    controls.style.display = 'block';
    controls.style.left = (parseInt(plant.style.left) + plant.offsetWidth) + 'px';
    controls.style.top = plant.style.top;
}

function rotatePlant(deg) {
    if (selectedPlant) {
        let currentRotation = selectedPlant.style.transform ? 
            parseInt(selectedPlant.style.transform.replace('rotate(', '').replace('deg)', '')) : 0;
        selectedPlant.style.transform = `rotate(${currentRotation + deg}deg)`;
    }
}

function resizePlant(factor) {
    if (selectedPlant) {
        let currentWidth = selectedPlant.offsetWidth;
        let currentHeight = selectedPlant.offsetHeight;
        selectedPlant.style.width = (currentWidth * factor) + 'px';
        selectedPlant.style.height = (currentHeight * factor) + 'px';
    }
}

function removePlant() {
    if (selectedPlant) {
        selectedPlant.remove();
        selectedPlant = null;
        document.querySelector('.controls').style.display = 'none';
    }
}