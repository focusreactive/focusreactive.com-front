const videos = document.querySelectorAll("video");
const config = {
  rootMargin: "0px -100px",
  threshold: 0,
};
const callback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.pause();
    } else {
      entry.target.play();
    }
  });
};

export const video = () => {
  const observer = new IntersectionObserver(callback, config);

  videos.forEach((element) => {
    observer.observe(element);
  });
};
