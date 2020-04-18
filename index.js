//TOKEN CHART 


const options = {
    chart: {
      type: 'donut',
      width: '600px',
      height: '600px'
    },
    series: [75,20,5],
    labels: ['company', 'reward', 'SI'],
    fill: {
        colors: ['#616de7', '#FF7A31', '#58BBFF'],
    },
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
        fillSeriesColor: true
    },
    dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        formatter: function (val) {
            let name = '';
            switch (val) {
                case 75:
                    name = 'Company owned';
                    break;
                case 20:
                    name = 'Learning reward';
                    break;
                case 5:
                    name = 'SI';
                    break;                
            }
          return `${name} ${val}%`
        },
        style: {
            fontSize: '20px',
            colors: ['#fff', '#fff', '#fff']
        }
    },
    plotOptions: {
        pie: {
          donut: {
            size: '40%',
          }
        }
    }
    
}

  
const chart = new ApexCharts(document.querySelector("#chart"), options);
  
chart.render();

//scroll event

const chartBoxEl = document.querySelector('.chartBox');

function scrollView() { 
    const chartIntAt = (window.scrollY + window.innerHeight) - chartBoxEl.offsetHeight / 4;
    const chartBottom = chartBoxEl.offsetTop + chartBoxEl.offsetHeight; 
    const isHalfShown = chartIntAt > chartBoxEl.offsetTop; 
    const isNotScrolledPast = window.scrollY < chartBottom; 
    
    if (isHalfShown && isNotScrolledPast) { 
        chartBoxEl.classList.add('show'); 
        } else { 
            chartBoxEl.classList.remove('show');
        }

    console.log('scrolled', isHalfShown, isNotScrolledPast);
}


//thorottle

function throttle(fn, delay) {
    let timer
    return function() {
        if (!timer){
            timer = setTimeout(() => {
                timer = null
                fn.apply(this, arguments)
            }, delay)
        }
    }
}

window.addEventListener('scroll', throttle(scrollView, 500));



// swiper

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    direction: getDirection(),
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      resize: function () {
        swiper.changeDirection(getDirection());
      }
    }
  });

  function getDirection() {
    // var windowWidth = window.innerWidth;
    // var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';
    var direction = 'horizontal';

    return direction;
  }