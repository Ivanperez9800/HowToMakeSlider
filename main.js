const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];


const wrapper = document.querySelector(".wrapper");


const firstCardWidth = carousel.querySelector(".card").offsetWidth; //OBTIENE EL ANCHO DE LA PRIMERA TARJETA


let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
})


carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML)
})


let isDragging = false, startX, startScrollLeft,timeOutId;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})



const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {

    if (!isDragging) return;

    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}


const dragStop = () => {

    isDragging = false;
    carousel.classList.remove("dragging");

}


const autoPlay = () => {
    if(window.innerWidth < 800) return ;
    timeOutId = setTimeout(()=>carousel.scrollLeft+=firstCardWidth,2500);
}

autoPlay();


const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition")
    }

    clearTimeout(timeOutId);

    if(!wrapper.matches(":hover")){
        autoPlay();
    }

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseover", dragging);
document.addEventListener("mouseup", dragStop);

carousel.addEventListener("scroll", infiniteScroll);







/* 25/9/2023  ==> ADAPTAR EL JS AL PROYECTO HUMAYA*/