/*Parallax*/
let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');
let titleBanner2 = document.querySelector('.banner h2');

window.addEventListener("scroll", (event) => {
    let top = this.scrollY;
    listBg.forEach((bg, index) => {
        if(index != 0 && index != 8){
            bg.style.transform = `translateY(${(top*index/2)}px)`;
        }else if(index == 0){
            bg.style.transform = `translateY(${(top/3)}px)`;
        }
    })

    titleBanner.style.transform = `translateY(${(top*4/2)}px)`;
    titleBanner2.style.transform = `translateY(${(top*4/2)}px)`;

    /* parallax scroll,when position less than 550
    from scrollbar position add active class to animate 
    and vice versa*/
    listTab.forEach(tab =>{
        if(tab.offsetTop - top < 550){
            tab.classList.add('active');
        }else{
            tab.classList.remove('active');
        }
    })
});  

/* fixes #home*/ 
document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});