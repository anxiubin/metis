import {news} from './news.js';


//change language

const chooseBtn = document.querySelector('.header-btn.lang');
const langList = document.querySelector('.lang-list');

function showLangList() {
    if(langList.classList.contains('show')) {
        langList.classList.remove('show');
    } else {
        langList.classList.add('show');
    }
}

function changeLang() {
    chooseBtn.innerText = event.target.innerText;
    langList.classList.remove('show');
}

langList.addEventListener('click', changeLang);
chooseBtn.addEventListener('click', showLangList);


//make token chart

  
function printGraph() {
    // Themes 
    am4core.useTheme(am4themes_animated);
    
    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.PieChart);
    
    // Add data
    chart.data = [ {
        "target": "Team",
        "rate": 17,
        "color": "#FFB600",
        "labelColor": "yellow"
        },{
        "target": "Adviser",
        "rate": 3,
        "color": "#FFA804",
        "labelColor": "yellow"
        },{
        "target": "Partner",
        "rate": 8,
        "color": "#FF9A09",
        "labelColor": "yellow"
        },{
        "target": "Reserve",
        "rate": 7,
        "color": "#FF8C0D",
        "labelColor": "yellow"
        },{
        "target": "Marketing",
        "rate": 10,
        "color": "#FF7E12",
        "labelColor": "yellow"
        },{
        "target": "Ecosystem",
        "rate": 20,
        "color": "#FF7016",
        "labelColor": "yellow"
        },{
        "target": "Sale",
        "rate": 35,
        "color": "#7D2C16",
        "labelColor": "yellow"
        } ];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);
    
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "rate";
    pieSeries.dataFields.category = "target";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.labels.template.text = "[bold]{target}: [bold]{rate}%";
    pieSeries.slices.template.tooltipText = "{target}: [bold]{rate}%";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.tooltip.autoTextColor = false;
    pieSeries.tooltip.label.fill = am4core.color("#FFF");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.defaultState.transitionDuration = 1000;
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    pieSeries.labels.template.adapter.add("fill", function(color,target) {

        const targetName = target.dataItem.dataContext.target;

        switch (targetName) {
            case 'Sale':
              return am4core.color("#7D2C16");
            case 'Ecosystem':
                return am4core.color("#FF7016");
            case 'Marketing':
                return am4core.color("#FF7E12");
            case 'Reserve':
                return am4core.color("#FF8C0D");
            case 'Partner':
                return am4core.color("#FF9A09");
            case 'Adviser':
                return am4core.color("#FFA804");
            case 'Team':
                return am4core.color("#FFB600");
            default:
              return am4core.color("#000");
          }
    });

}


//scroll event

const chartBoxEl = document.querySelector('.chartBox');
const scrolltopBtn = document.querySelector('.scrolltop');
let checkNum = 0;

function scrollView() { 
    const chartIntAt = (window.scrollY + window.innerHeight) - chartBoxEl.offsetHeight / 10;
    const chartBottom = chartBoxEl.offsetTop + chartBoxEl.offsetHeight; 
    const isHalfShown = chartIntAt > chartBoxEl.offsetTop; 
    const isNotScrolledPast = window.scrollY < chartBottom; 

    // view chart
    if (isHalfShown && isNotScrolledPast) { 
        checkNum += 1;
        if (checkNum === 1) {
            am4core.ready(printGraph); 
        }
    }

    // view scroll button
    if(window.scrollY !== 0) {
        scrolltopBtn.classList.add('show');
    } else {
        scrolltopBtn.classList.remove('show');
    }

    console.log('scrolled', isHalfShown, isNotScrolledPast, window.scrollY);
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



// News swiper

const swiper = new Swiper('.swiper-container', {
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


function getNews() {

    for(let i = 0; i < news.length; i++) {
        const slideEl = document.createElement('div');
        const linkEl = document.createElement('a');
        const imgEl = document.createElement('img');
        const textEl = document.createElement('p');

        slideEl.classList.add('swiper-slide');
        linkEl.href = news[i].link;
        linkEl.target = "_blank";
        imgEl.setAttribute('src', news[i].img);
        imgEl.classList.add('swiper-lazy');
        textEl.innerText = news[i].text;

        linkEl.appendChild(imgEl);
        slideEl.appendChild(linkEl);
        slideEl.appendChild(textEl);

        swiper.appendSlide(slideEl);

        console.log('news create')
    }
}

getNews();


// toggle nav

const toggleEl = document.querySelector('.toggle')
const toggleBtn = document.getElementById('toggle-btn');

function toggleNav() {
    toggleEl.classList.toggle('on');
}

function hideToggleEl() {
    toggleEl.classList.remove('on');
}

toggleBtn.addEventListener('click', function(){
    toggleNav();
});

window.addEventListener('resize', function() {
    if(window.innerWidth > 1024) {
        hideToggleEl();
    }
})