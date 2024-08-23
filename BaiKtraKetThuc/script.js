const images = ['./bau.png', './ca.png', './cua.png', './ga.png', './huou.png', './tom.png'];
    const bets = [0, 0, 0, 0, 0, 0];
    let totalBet = 0;
    let isSpinning = false;

    function startSpin() {
        if (isSpinning || totalBet === 0) return; 
        isSpinning = true;
        disableControls(true);

        let spins = 0;
        const slot1 = document.getElementById('img1');
        const slot2 = document.getElementById('img2');
        const slot3 = document.getElementById('img3');
        
        const interval = setInterval(() => {
            slot1.src = images[Math.floor(Math.random() * images.length)];
            slot2.src = images[Math.floor(Math.random() * images.length)];
            slot3.src = images[Math.floor(Math.random() * images.length)];
            spins++;
            if (spins >= 100) {
                clearInterval(interval);
                isSpinning = false;
                disableControls(false);
                checkResult([slot1.src, slot2.src, slot3.src]);
            }
        }, 50);
    }

    function placeBet(index) {
        if (totalBet < 3 && !isSpinning) {
            bets[index]++;
            totalBet++;
            document.getElementById(`betAmount${index}`).textContent = `${bets[index]}$`;
            document.getElementById('totalBet').textContent = totalBet;
        }
    }

    function resetBet() {
        if (isSpinning) return; 
        totalBet = 0;
        for (let i = 0; i < bets.length; i++) {
            bets[i] = 0;
            document.getElementById(`betAmount${i}`).textContent = `0`;
        }
        document.getElementById('totalBet').textContent = totalBet;
    }

    function disableControls(disable) {
        document.querySelector('button[onclick="startSpin()"]').disabled = disable;
        document.querySelector('button[onclick="resetBet()"]').disabled = disable;
        document.querySelectorAll('.bet-item img').forEach(img => {
            img.style.pointerEvents = disable ? 'none' : 'auto';
        });
    }
    function checkResult(resultImages) {
    const resultCounts = [0, 0, 0, 0, 0, 0];

    resultImages.forEach(resultImage => {
        const resultFilename = resultImage.substring(resultImage.lastIndexOf('/') + 1);
        const index = images.indexOf(`./${resultFilename}`);
        if (index > -1) {
            resultCounts[index]++;
        }
    });

    let isWin = false;
    const resultStrings = [];
    const betStrings = [];

    for (let i = 0; i < resultCounts.length; i++) {
        resultStrings.push(`${images[i].replace('./', '').replace('.png', '')} ${resultCounts[i]}`);
        betStrings.push(`${images[i].replace('./', '').replace('.png', '')} ${bets[i]}`);
        if (bets[i] > 0 && resultCounts[i] > 0) {
            isWin = true;
        }
    }

    const resultMessage = `Kết quả: ${resultStrings.join(', ')}`;
    const betMessage = `Bạn đã cược: ${betStrings.join(', ')}`;

    console.log(betMessage);
    if (isWin) {
        console.log(`Bạn đã đoán đúng với ${resultMessage}`);
    } else {
        console.log(`Bạn đã đoán sai với ${resultMessage}`);
    }
}
