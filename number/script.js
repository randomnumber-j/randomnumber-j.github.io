document.getElementById('drawForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const min = parseInt(document.getElementById('minRange').value);
    const max = parseInt(document.getElementById('maxRange').value);
    const excludeInput = document.getElementById('excludeNumbers').value;
    const drawCount = parseInt(document.getElementById('drawCount').value);

    // Validate inputs
    if (min >= max) {
        alert('Maximum range must be greater than minimum range');
        return;
    }

    // Parse excluded numbers
    const excludedNumbers = excludeInput
        ? excludeInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
        : [];

    // Create array of available numbers
    let availableNumbers = [];
    for (let i = min; i <= max; i++) {
        if (!excludedNumbers.includes(i)) {
            availableNumbers.push(i);
        }
    }

    // Validate if we have enough numbers to draw
    if (drawCount > availableNumbers.length) {
        alert(`Cannot draw ${drawCount} unique numbers from the available range`);
        return;
    }

    // Draw random numbers
    const drawnNumbers = [];
    while (drawnNumbers.length < drawCount) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        drawnNumbers.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
    }

    // Display results with staggered animation
    const resultDiv = document.getElementById('drawnNumbers');
    resultDiv.innerHTML = ''; // Clear previous results

    drawnNumbers
        .sort((a, b) => a - b)
        .forEach((num, index) => {
            setTimeout(() => {
                const span = document.createElement('span');
                span.className = 'number-badge';
                span.textContent = num;
                resultDiv.appendChild(span);
            }, index * 150); // Stagger each number by 150ms
        });
});

document.getElementById('goSingleBtn').addEventListener('click', function () {
    const drawnNumbersDiv = document.getElementById('drawnNumbers');
    const numbers = Array.from(drawnNumbersDiv.children).map(span => parseInt(span.textContent));
    if (numbers.length === 0) {
        alert('Please generate some numbers first!');
        return;
    }

    localStorage.setItem('numbers', JSON.stringify(numbers));
    location.href = 'single-draw.html';
});

$(document).ready(function () {
    if (localStorage.getItem('numbers')) {
        //remove the local storage
        localStorage.removeItem('numbers');
    }

    if (localStorage.getItem('randomNumberDrawRecord') != null) {
        var record = JSON.parse(localStorage.getItem('randomNumberDrawRecord'));
        record.forEach(function (number, index) {
            $('#excludeNumbers').val($('#excludeNumbers').val() + number + (index === record.length - 1 ? '' : ', '));
        });
    }

    $("#minRange").val(1);

    $('#clearBtn').click(function () {
        $('#excludeNumbers').val('');
    });
});

// Add this to your existing script.js
function displayDrawnNumber(number) {
    const badge = document.createElement('div');
    badge.className = 'number-badge';
    badge.textContent = number;
    document.getElementById('drawnNumbers').appendChild(badge);
}