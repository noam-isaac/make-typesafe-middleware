// This is a placeholder config for now, I will publish and use my own config later
module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['import', '@typescript-eslint'],
	rules: {
		'import/prefer-default-export': 'off',
		'no-void': 'off',
	},
};
