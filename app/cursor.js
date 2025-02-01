const mic = document.querySelector('.cur');
// const cursor = document.querySelector('.cursor');
// const cursor2 = document.querySelector('.cursor2');
document.addEventListener('mousemove', e => {
    // cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
    // cursor2.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
    console.log(e.pageX, e.pageY);
    mic.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
    }
);