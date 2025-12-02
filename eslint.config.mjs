import eslintConfigNext from 'eslint-config-next';

const config = [
  {
    ignores: ['node_modules', '.next', 'dist'],
  },
  ...eslintConfigNext,
];

export default config;

