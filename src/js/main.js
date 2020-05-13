import "@babel/polyfill";
import {throttle} from './throttle.js';

// // position: sticky 속성 IE 적용
const element = document.getElementById('stickyId'); 
Stickyfill.add(element);


//change language

const chooseBtn = document.querySelector('.header-btn.lang');
const langList = document.querySelector('.lang-list');

function showLangList() {
    if(langList.classList.contains('show-flex')) {
        langList.classList.remove('show-flex');
    } else {
        langList.classList.add('show-flex');
    }
}

function changeLang() {
    chooseBtn.innerText = event.target.innerText;
    langList.classList.remove('show-flex');
}

langList.addEventListener('click', changeLang);
chooseBtn.addEventListener('click', showLangList);



// print Token chanrt



const tokenData = [ {
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

  
function printGraph() {
    // Themes 
    am4core.useTheme(am4themes_animated);
    
    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart.data = tokenData;

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    //Add label
    const label = chart.seriesContainer.createChild(am4core.Label);
    label.textAlign = "middle";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.adapter.add("text", function(text, target){
        return "[bold font-size:20px font-family: 'Roboto']Total[/]\n[bold font-size:22px font-family: 'Roboto']1,000,000,000[/]";
      });
    label.fill = am4core.color("#7D2C16");
    
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "rate";
    pieSeries.dataFields.category = "target";
    pieSeries.slices.template.propertyFields.fill = "color";


    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.tooltip.autoTextColor = false;
    pieSeries.tooltip.label.fill = am4core.color("#FFF");
    pieSeries.tooltip.fontFamily = "Roboto";
    pieSeries.defaultState.transitionDuration = 1000;
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.text = "[bold]{target}: [bold]{rate}%";
    pieSeries.slices.template.tooltipText = "{target}: [bold]{rate}%";
    pieSeries.labels.template.fontFamily= "Roboto";
    pieSeries.labels.template.wrap = true;


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


    //toggle label

    if(window.innerWidth <= 768) {
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
    } else {
        pieSeries.labels.template.disabled = false;
        pieSeries.ticks.template.disabled = false;
    }
    

    window.addEventListener('resize', throttle(function() {
            if(window.innerWidth <= 768) {
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
            } else {
                pieSeries.labels.template.disabled = false;
                pieSeries.ticks.template.disabled = false;
            }
        }, 1000)
    );

}


const chartBoxEl = document.querySelector('.chartBox');

let checkNum = 0;

function scrollView() { 
    const chartIntAt = (window.pageYOffset + window.innerHeight) - chartBoxEl.offsetHeight / 10;
    const chartBottom = chartBoxEl.offsetTop + chartBoxEl.offsetHeight; 
    const isHalfShown = chartIntAt > chartBoxEl.offsetTop; 
    const isNotScrolledPast = window.pageYOffset < chartBottom; 

    // view chart
    if (isHalfShown && isNotScrolledPast) { 
        checkNum += 1;
        console.log(checkNum);
        if (checkNum === 1) {
            console.log(checkNum);
            am4core.ready(printGraph); 
        }
    }

}

window.addEventListener('scroll', throttle(scrollView, 500));




// show scroll button

const scrolltopBtn = document.querySelector('.scrolltop');

function showScrollBtn() { 
    if(window.pageYOffset !== 0) {
        scrolltopBtn.classList.add('show');
    } else {
        scrolltopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', throttle(showScrollBtn, 1000));




// swiper

import {news} from './news.js';

const newsSwiper = new Swiper('.swiper-container', {
    // Default parameters
    slidesPerView: 1,
    // Responsive breakpoints
    breakpoints: {
        // window width >= 1024px
        1024: {
        slidesPerView: 2,
        }
    },
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    lazy: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


function getNews() {

    for(let i = 0; i < news.length; i++) {
        const slideEl = document.createElement('div');
        const linkEl = document.createElement('a');
        const imgEl = document.createElement('img');
        const textEl = document.createElement('p');

        slideEl.classList.add('swiper-slide');
        slideEl.classList.add('newsslide');
        linkEl.href = news[i].link;
        linkEl.target = "_blank";
        imgEl.setAttribute('src', news[i].img);
        imgEl.classList.add('swiper-lazy');
        textEl.innerText = news[i].text;

        linkEl.appendChild(imgEl);
        slideEl.appendChild(linkEl);
        slideEl.appendChild(textEl);

        newsSwiper.appendSlide(slideEl);
    }
}

getNews();



// App swiper

const appSwiper = new Swiper('.swiper-container-appslide', {
    centeredSlides: true,
    autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },
});



// toggle navigation

const toggleEl = document.querySelector('.toggle')
const toggleBtn = document.getElementById('toggle-btn');
const navMenus = document.querySelectorAll('.nav-menu a');

function toggleNav() {
    toggleEl.classList.toggle('on');
}

function hideToggleEl() {
    toggleEl.classList.remove('on');
}

function init() {
    toggleBtn.addEventListener('click', toggleNav);

    window.addEventListener('resize', throttle(function() {
        if(window.innerWidth > 1024) {
            hideToggleEl();
        }}, 1000)
    );
    
    navMenus.forEach(list => {
        list.addEventListener('click', hideToggleEl);
    })
}

init();
