// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.3em", 0],
    translateZ: 50,
    duration: 1000,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1300,
    easing: "easeOutExpo",
    delay: 1000000
  });

  //index.ejs파일에서 글자들 위아래로 움직이는 애니메이션임 from anime.js