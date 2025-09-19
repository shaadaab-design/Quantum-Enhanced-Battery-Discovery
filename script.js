const canvas = document.getElementById("batteryCanvas");
const ctx = canvas.getContext("2d");

const numIonsSlider = document.getElementById("numIons");
const quantumSlider = document.getElementById("quantumFactor");
const cyclesSlider = document.getElementById("cycles");

const numIonsValue = document.getElementById("numIonsValue");
const quantumValue = document.getElementById("quantumValue");
const cyclesValue = document.getElementById("cyclesValue");
const statsDiv = document.getElementById("stats");

function simulateBattery() {
    const numIons = parseInt(numIonsSlider.value);
    const quantumFactor = parseFloat(quantumSlider.value);
    const cycles = parseInt(cyclesSlider.value);

    numIonsValue.textContent = numIons;
    quantumValue.textContent = quantumFactor;
    cyclesValue.textContent = cycles;

    let efficiency = 1.0;
    let efficiencies = [];

    for(let i = 0; i < cycles; i++) {
        let fluctuation = (Math.random() - 0.5) * 0.01;
        let energyLoss = 0.01 * (1 - quantumFactor);
        efficiency -= (energyLoss + fluctuation);
        if(efficiency < 0) efficiency = 0;
        efficiencies.push(efficiency);
    }

    drawGraph(efficiencies);

    statsDiv.innerHTML = `
        <p><strong>Final Efficiency:</strong> ${(efficiency*100).toFixed(2)}%</p>
        <p><strong>Number of Ions:</strong> ${numIons}</p>
        <p><strong>Quantum Optimization Level:</strong> ${quantumFactor}</p>
    `;
}

function drawGraph(efficiencies) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ff9900";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = canvas.width / efficiencies.length;
    for(let i = 0; i < efficiencies.length; i++) {
        const x = i * step;
        const y = canvas.height - efficiencies[i] * canvas.height;
        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// Run simulation whenever sliders change
numIonsSlider.oninput = simulateBattery;
quantumSlider.oninput = simulateBattery;
cyclesSlider.oninput = simulateBattery;

// Initial simulation
simulateBattery();
