import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
  plugins: [
    plugin(function ({ addVariant, matchVariant }) {
      matchVariant('transit-from', value => {
        return [`&.${value}-enter-to`, `&.${value}-leave-from`];
      });
      matchVariant('transit-to', value => {
        return [`&.${value}-enter-from`, `&.${value}-leave-to`];
      });
      matchVariant('transiting', value => {
        return [`&.${value}-enter-active`, `&.${value}-leave-active`];
      });
      addVariant('v-transit-from', ['&.v-enter-to', '&.v-leave-from']);
      addVariant('v-transit-to', ['&.v-enter-from', '&.v-leave-to']);
      addVariant('v-transiting', ['&.v-enter-active', '&.v-leave-active']);
    }),
  ],
};

export default config;
