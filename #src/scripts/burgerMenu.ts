import BurgerMenu, { autoPaddingOptions } from './modules/burgerMenu.src.js'

new BurgerMenu({
	burgerSelector: '#burgerButton',
	burgerMenuSelector: '.burger-menu',
	buttonsSelector: '.fs-element',
	autoPadding: new autoPaddingOptions('.header'),
	menuActiveClass: 'active',
	burgerActiveClass: 'active',
	closingByClickOnElement: true,
})