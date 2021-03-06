import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js";
export default class BurgerMenu {
    constructor(args) {
        if (!elementIsExistWithLog('BurgerMenu', args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector)) {
            return;
        }
        BurgerMenu.burger = document.querySelector(args.burgerSelector);
        BurgerMenu.menu = document.querySelector(args.burgerMenuSelector);
        BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector);
        BurgerMenu.autoPadding = args.autoPadding;
        if (args.burgerActiveClass)
            BurgerMenu.burgerActiveClass = args.burgerActiveClass;
        if (args.menuActiveClass)
            BurgerMenu.menuActiveClass = args.menuActiveClass;
        if (args.autoPadding)
            BurgerMenu.menu.style.paddingTop = `${BurgerMenu.header.clientHeight}px`;
        BurgerMenu.burger.addEventListener('click', this.toggleNavmenu);
        for (let button of BurgerMenu.buttons) {
            button.addEventListener('click', this.hideNavmenu);
        }
    }
    toggleNavmenu() {
        let scrollbarWidth = returnScrollbarWidth();
        if (BurgerMenu.autoPadding)
            BurgerMenu.menu.style.paddingTop = `${BurgerMenu.header.clientHeight}px`;
        BurgerMenu.burger.classList.toggle(BurgerMenu.burgerActiveClass);
        if (document.body.style.overflow != 'hidden') {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        BurgerMenu.header.style.paddingRight = `${scrollbarWidth}px`;
        BurgerMenu.menu.classList.toggle(BurgerMenu.menuActiveClass);
    }
    hideNavmenu() {
        let scrollbarWidth = returnScrollbarWidth();
        BurgerMenu.burger.classList.remove(BurgerMenu.burgerActiveClass);
        if (document.body.style.overflow.includes('hidden')) {
            document.body.style.overflow = '';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        BurgerMenu.menu.classList.remove(BurgerMenu.menuActiveClass);
    }
}
BurgerMenu.header = document.querySelector('header');
BurgerMenu.autoPadding = true;
BurgerMenu.burgerActiveClass = 'active';
BurgerMenu.menuActiveClass = 'active';