import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'

import paths from '../other/paths.js'

export default {
  options: {
    use: [
      component({
        root: paths.src.root,
        folders: ['components'],
      }),
      imgAutosize({
        root: paths.src.root,
        processEmptySize: true,
      }),
    ],
  },
  main: {
    files: [{
      expand: true,

      cwd: paths.src.root,
      src: '*.html',
      dest: paths.dest.root,
      ext: '.html',
    }]
  }
}