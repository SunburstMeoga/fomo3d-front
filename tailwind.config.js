module.exports = {
  purge: [],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    // },
    colors: {
      'primary': '#DA251D',
      'secondary': '#F87171',
      'text': '#D1D5DB',
      'moduleBg': '#191c22',
      'barWhite': '#D1D5DB',
      'teamBg': '#000'
    },
    extend: {
      backgroundImage: {
        'home-main': "url('@/assets/homeBackground.jpg')",
      },
      width: {
        '9/20': '48%'
      }
    }
  },
  corePlugins: {},
  plugins: [],
}
