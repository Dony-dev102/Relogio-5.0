const hourVal = document.getElementById('hour-val');
const dateVal = document.getElementById('date-val');
const minDisk = document.getElementById('minutes-disk');
const progressBar = document.getElementById('progress-bar');

const TOTAL_CIRCUMFERENCE = 283;

function createDisk(container, radius) {
    container.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        // 0 graus é a posição do marcador lateral direito
        item.style.transform = `rotate(${i * 6}deg) translateX(${radius}px)`;
        
        if (i % 5 === 0) {
            item.innerHTML = `<span>${i < 10 ? '0' + i : i}</span>`;
        } else {
            item.classList.add('tick');
        }
        container.appendChild(item);
    }
}

createDisk(minDisk, 155);

function update() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    // Atualiza Hora e Data
    hourVal.innerText = h < 10 ? '0' + h : h;
    const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    dateVal.innerText = `${now.getDate().toString().padStart(2, '0')} ${meses[now.getMonth()]} ${now.getFullYear()}`;

    // Rotação: Traz o minuto atual para o marcador (0 graus)
    const mDeg = -(m * 6);
    minDisk.style.transform = `rotate(${mDeg}deg)`;

    // Barra de progresso circular
    const progress = (s + ms / 1000) / 60;
    if (progressBar) {
        progressBar.style.strokeDashoffset = TOTAL_CIRCUMFERENCE - (progress * TOTAL_CIRCUMFERENCE);
    }

    // Alinhamento dos números e efeito "Active"
    document.querySelectorAll('.item span').forEach(span => {
        const parentTransform = span.parentElement.style.transform;
        const initialRot = parseFloat(parentTransform.match(/rotate\((.*)deg\)/)[1]);
        
        // Mantém o texto reto enquanto o disco gira
        span.style.transform = `rotate(${- (initialRot + mDeg)}deg)`;
        
        // Verifica se o número está na posição 0 (marcador)
        const currentPos = (initialRot + mDeg) % 360;
        if (Math.abs(currentPos) < 3 || Math.abs(currentPos + 360) < 3) {
            span.parentElement.classList.add('active');
        } else {
            span.parentElement.classList.remove('active');
        }
    });
}

setInterval(update, 50);
update();