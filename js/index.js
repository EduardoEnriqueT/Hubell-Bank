const header = document.querySelector("header");
const sectionOne = document.querySelector(".first");
const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver){
entries.forEach(entry => {
    if(!entry.isIntersecting){
        header.classList.add('bg-dark');
    } else {
        header.classList.remove('bg-dark');
    }
})

},sectionOneOptions );

sectionOneObserver.observe(sectionOne);


//Animations 

anime({
    targets: '#front-card',
    translateX: [-400,0],
    direction: 'alternate',
    loop: false,
    easing: 'linear'
  });

