import AnimateByScroll, { AnimationGroup, AnimationTimeline, AnimationMediaQuery } from './animateByScroll.src.js'

new AnimateByScroll(
  { repeatingAnimations: true, activeAnimationClass: 'active' },

  new AnimationGroup({
    selectors: '.animation_by_scroll__item',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 500,
  },
    new AnimationMediaQuery({
      activationWidth: 768,
      defAnimStartCoeffs: [0.8, 0.8],
      timeoutBeforeStart: 300,
    })
  ),

  new AnimationGroup({
    selectors: '.animation_by_scroll__item_2',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 1500,
  },
    new AnimationMediaQuery({
      activationWidth: 768,
      defAnimStartCoeffs: [0.8, 0.8],
      timeoutBeforeStart: 300,
    })
  ),


  // new AnimationTimeline({
  //   // ? The block that will be animated.
  //   selectors: '.text',

  //   animatedProperties: {
  //     background: ['black', 'white']
  //   },

  //   animateSettings: {
  //     // ? For scroll relative to some block.
  //     timeline: new ViewTimeline({
  //       // The block that needs to be scrolled for the beginning and end of animations.
  //       subject: document.querySelector('.container'),
  //     }),

  //     // ? For scroll relative to the full page.
  //     // timeline: new ScrollTimeline({
  //     // 	orientation: 'block',
  //     // 	scrollOffsets: [CSS.percent(0), CSS.percent(100)],
  //     // })

  //     // ? Fill in like this: 
  //     // 'Fill_type Scroll_block_for_start Scroll_block_for_end'
  //     timeRange: 'cover 0% 100%',
  //   }
  // })
)