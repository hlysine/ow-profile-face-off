import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '1bw': '15rem',
        '2bw': '31rem',
        '3bw': '47rem',
        '4bw': '63rem',
        '5bw': '79rem',
      },
      minWidth: {
        '1bw': '15rem',
        '2bw': '31rem',
        '3bw': '47rem',
        '4bw': '63rem',
        '5bw': '79rem',
      },
      maxWidth: {
        '1bw': '15rem',
        '2bw': '31rem',
        '3bw': '47rem',
        '4bw': '63rem',
        '5bw': '79rem',
      },
      height: {
        '1bh': '12rem',
        '2bh': '25rem',
        '3bh': '38rem',
        '4bh': '51rem',
        '5bh': '64rem',
      },
      minHeight: {
        '1bh': '12rem',
        '2bh': '25rem',
        '3bh': '38rem',
        '4bh': '51rem',
        '5bh': '64rem',
      },
      maxHeight: {
        '1bh': '12rem',
        '2bh': '25rem',
        '3bh': '38rem',
        '4bh': '51rem',
        '5bh': '64rem',
      },
    },
  },
  plugins: [],
};

export default config;
