gsap.registerPlugin(ScrollTrigger);

gsap.set('#hero', { scale: 0.8, opacity: 0 });

gsap.to('#hero', {
  opacity: 1,
  duration: 1,
  delay: 0.2
});

gsap.to('#hero', {
  scale: 1,
  duration: 1,
  delay: 1,
  ease: "power4.inOut"
});

gsap.fromTo('.title', {
  opacity: 0,
  scale: 0.8,
}, {
  opacity: 1,
  scale: 1,
  duration: 1,
  delay: 1,
  ease: "power4.inOut",
  onComplete: () => {
    gsap.to('.title', {
      scale: 1.5,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: '.title',
        start: 'center center',
        scrub: 0.5,
        // markers: true
      }
    });
  }
});

const canvas = document.getElementById("hero");
const ctx = canvas.getContext("2d");
canvas.width = 1068;
canvas.height = 600;
const TOTAL_FRAMES = 65;

const createURL = (frame) => {
  const id = frame.toString().padStart(4, "0");
  return `/public/airpods/${id}.png`;
};

const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const img = new Image;
  img.src = createURL(i);
  return img;
});

const airpods = {
  frame: 0
};

gsap.to(airpods, {
  frame: TOTAL_FRAMES - 1,
  ease: "none",
  snap: "frame",
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render
})

images[0].onload = () => render();

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[airpods.frame], 0, 0);
};