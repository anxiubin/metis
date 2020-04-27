import {throttle} from './throttle.js';


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
