$(() => {
    const consultationData = [
        { label: 'Sprawdzian - Poprawa', users: 30, color: 'rgba(255, 99, 132, 0.8)' },
        { label: 'Konsultacje', users: 20, color: 'rgba(54, 162, 235, 0.8)' },
        { label: 'Sprawdzian - Pierwszy Termin', users: 30, color: 'rgba(255, 206, 86, 0.8)' },
        { label: 'Kartkówka', users: 15, color: 'rgba(75, 192, 192, 0.8)' },
        { label: 'Inne', users: 5, color: 'rgba(153, 102, 255, 0.8)'}
    ];

    // Przetwarzanie danych do formatu akceptowalnego przez Chart.js
    const labels = consultationData.map(data => data.label);
    const dataCounts = consultationData.map(data => data.users);
    const backgroundColor = consultationData.map(data => data.color);

    const labelColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

    // Konfiguracja wykresu
    const ctx = document.getElementById('consultationChart').getContext('2d');
    const consultationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: '% Uczestników',
                data: dataCounts,
                backgroundColor: backgroundColor,
                borderColor: 'transparent'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        useBorderRadius: true,
                        borderRadius: 12,
                        color: labelColor,
                        font: {
                            family: 'Roboto, sans-serif',
                            size: 10,
                            weight: 300,
                            style: 'normal',
                        }
                    },
                    maxWidth: '100%', 
                }
            }
        }
    });
});