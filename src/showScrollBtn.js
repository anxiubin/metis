import {throttle} from './throttle.js';

const scrolltopBtn = document.querySelector('.scrolltop');

function showScrollBtn() { 
    if(window.scrollY !== 0) {
        scrolltopBtn.classList.add('show');
    } else {
        scrolltopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', throttle(showScrollBtn, 1000));