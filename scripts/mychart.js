let ctx;

function createChart(pokemon) {
    ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
            datasets: [{
                label: false,
                data: [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat],
                backgroundColor: [
                    'rgba(222, 13, 58, 0.5)',
                    'rgba(254, 146, 38, 0.5)',
                    'rgba(8, 107, 255, 0.5)',
                    'rgba(255, 28, 251, 0.5)',
                    'rgba(180, 0, 114, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 209, 25, 0.5)'
                ],
                borderColor: [
                    'rgba(222, 13, 58, 1)',
                    'rgba(254, 146, 38, 1)',
                    'rgba(8, 107, 255, 1)',
                    'rgba(255, 28, 251, 1)',
                    'rgba(180, 0, 114, 1)',
                    'rgb(153, 102, 255)',
                    'rgba(255, 209, 25, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            devicePixelRatio: 2,
            plugins: {
                legend: {
                    display: false   // <-- hides the legend
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 200,
                    ticks: {
                        color: 'black',
                        font: {
                            family: 'Neue Comic, cursive',
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                        font: {
                            family: 'Neue Comic, cursive',
                        }
                    }
                }
            }
        }
    });
}
