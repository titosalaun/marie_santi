module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: true, // or 'media' or 'class'
  theme: {
	colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mainBg: {
        light: '#000',
        DEFAULT: '#000',
        dark: '#000',
      },
      mainColor: {
        light: '#fff',
        DEFAULT: '#fff',
        dark: '#fff',
      },
      activeColor: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff',
      },
      inputBg: {
        light: '#000',
        DEFAULT: '#000',
        dark: '#000',
      },
      buttonBg: {
        light: '#000',
        DEFAULT: '#000',
        dark: '#000',
      },
       buttonHoverBg: {
        light: '#fff',
        DEFAULT: '#fff',
        dark: '#fff',
      },
      modalBg: {
		  light: 'rgba(254,254,254,0.75)',
		  DEFAULT: 'rgba(254,254,254,0.75)',
		  dark: 'rgba(254,254,254,0.75)',
      },
      error: {
        light: '#EE1F25',
        DEFAULT: '#EE1F25',
        dark: '#EE1F25',
      },
      white: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff',
      },
      black: {
        light: '#000000',
        DEFAULT: '#000000',
        dark: '#000000',
      }
    },
    fontSize: {
      sm: ['13px', '16px'],
      base: ['13px', '15px'],
      lg: ['18px', '21px'],
      xl: ['24px', '27px'],
      mesure: ['80px', '68px'],
      infos: ['14px', '17px'],
      displaySpecimenOff: ['20px', 'unset'],
    },
    extend: {
	    fontFamily: {
	      'sans': ['UniversalSansDisplay', 'Helvetica', 'Arial', 'sans-serif'],
	      'serif': ['UniversalSansDisplay', 'Helvetica', 'Arial', 'sans-serif']
	    },
	    boxShadow: {
	        inputShadow: '0 2px 20px 0 rgba(23,62,255,0.30)',
	    },
	    padding: {
        	'6': '20px',
        	'5': '18px',
        }

    }
  },
  variants: {
    extend: {},
  },
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
	  require('@tailwindcss/forms'),
	  require('tw-elements/dist/plugin'),
  ],
  corePlugins: {
      // ...
    }
}
