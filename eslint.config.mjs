import next from 'eslint-config-next';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
    ...next,
    prettierConfig,
    {
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'warn',
            'react/display-name': 'off',
            '@next/next/no-img-element': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            // Disable overly strict Next.js 15 rules
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/preserve-manual-memoization': 'off',
        },
    },
];

export default eslintConfig;
