import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,

  headerFontFamily: ['Charter', 'Georgia', 'Cambria', '"Times New Roman"', 'Times, serif'],
  headerWeight: 'normal',
  headerColor: 'rgba(41, 41, 41, 1)',

  bodyFontFamily: ['Charter', 'Georgia', 'Cambria', '"Times New Roman"', 'Times, serif'],
  bodyColor: 'rgba(41, 41, 41, 1)',

  scaleRatio: 2,

  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    a: {
      color: 'blue',
    },
    blockquote: {
      background: '#f9f9f9',
      borderLeft: '5px solid #ccc',
      margin: '1.5em 10px',
      padding: '0.5em 10px',
      fontStyle: 'italic',
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
