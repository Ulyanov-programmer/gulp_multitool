import AnimateByScroll, { AnimationGroup, AnimationTimeline, AnimationMediaQuery } from "./modules/animateByScroll.js";
new AnimateByScroll({ repeatingAnimations: true, activeAnimationClass: "active" }, new AnimationGroup({
  selectors: ".animation_by_scroll__item",
  animateStartCoeff: [0.5, 0.5],
  timeoutBeforeStart: 500
}, new AnimationMediaQuery(768, [0.8, 0.8], 300)), new AnimationGroup({
  selectors: ".animation_by_scroll__item_2",
  animateStartCoeff: [0.5, 0.5],
  timeoutBeforeStart: 1500
}, new AnimationMediaQuery(768, [0.8, 0.8], 300)), new AnimationTimeline({
  selectors: ".text",
  animatedProperties: {
    transform: ["rotate(0deg)", "rotate(90deg)"]
  },
  animateSettings: {
    timeline: new ViewTimeline({
      subject: document.querySelector(".block-2")
    })
  }
}));
