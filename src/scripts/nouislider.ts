import * as noUiSlider from '../libs/nouislider/nouislider.min.mjs'

noUiSlider.create(document.getElementById('slider'), {
  start: [0, 100],
  connect: true,
  range: {
    'min': 0,
    'max': 100
  }
})