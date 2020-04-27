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

        console.log('news create')
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
