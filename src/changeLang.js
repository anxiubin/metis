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

