import {throttle} from './throttle.js';

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
        return "[bold font-size:20px font-family: 'roboto']Total[/]\n[bold font-size:25px font-family: 'roboto']1,000,000,000[/]";
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
    pieSeries.defaultState.transitionDuration = 1000;
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.text = "[bold]{target}: [bold]{rate}%";
    pieSeries.slices.template.tooltipText = "{target}: [bold]{rate}%";
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

}

window.addEventListener('scroll', throttle(scrollView, 500));