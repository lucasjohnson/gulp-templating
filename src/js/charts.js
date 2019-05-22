var ctx = document.getElementById('dashboardChart');

if (ctx !== null) {
  ctx.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Outsanding', 'Redeemed'],
      datasets: [{
        data: [30, 70],
        backgroundColor: [
          '#EEEEEE',
          '#0092CA'
        ]
      }]
    },
    options: {
      cutoutPercentage: 65,
      tooltips: {enabled: false},
      hover: {mode: null},
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          fontFamily: ['Lato', 'Helvetica', 'sans-serif']
        }
      }
    }
  });
}
