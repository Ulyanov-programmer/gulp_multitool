import { isNullOrWhiteSpaces } from "./general.js";
var SwipeSide;
(function (SwipeSide) {
    SwipeSide[SwipeSide["Top"] = 0] = "Top";
    SwipeSide[SwipeSide["Left"] = 1] = "Left";
    SwipeSide[SwipeSide["Bottom"] = 2] = "Bottom";
    SwipeSide[SwipeSide["Right"] = 3] = "Right";
})(SwipeSide || (SwipeSide = {}));
export var ChangePlane;
(function (ChangePlane) {
    ChangePlane[ChangePlane["ToLeft"] = 0] = "ToLeft";
    ChangePlane[ChangePlane["ToRight"] = 1] = "ToRight";
    ChangePlane[ChangePlane["ToTop"] = 2] = "ToTop";
    ChangePlane[ChangePlane["ToBottom"] = 3] = "ToBottom";
})(ChangePlane || (ChangePlane = {}));
var ChangeOrientation;
(function (ChangeOrientation) {
    ChangeOrientation[ChangeOrientation["Vertical"] = 0] = "Vertical";
    ChangeOrientation[ChangeOrientation["Horizontal"] = 1] = "Horizontal";
})(ChangeOrientation || (ChangeOrientation = {}));
export default class SwipeElement {
    constructor(arg) {
        this.startX = 0;
        this.startY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.pointerMoveHandler = (function (e) {
            this.swipableElement.style.userSelect = 'none';
            this.swipeMove(e);
        }).bind(this);
        this.pointerUpHandler = (function () {
            this.swipableElement.style.userSelect = '';
            this.swipeEnd(0, false, true);
        }).bind(this);
        if (isNullOrWhiteSpaces(arg.touchStartAreaSelector, arg.swipableElementSelector))
            throw new Error('[SWIPE-ELEMENT Some selector is null or white spaces!]');
        window.addEventListener(`resize`, () => {
            this.checkMaxWorkWidth();
        });
        this.touchAreaElement = document.querySelector(arg.touchStartAreaSelector);
        this.touchAreaElement.style.touchAction = 'none';
        this.swipableElement = document.querySelector(arg.swipableElementSelector);
        this.elementStartX = this.getTranslateState('x');
        this.elementStartY = this.getTranslateState('y');
        this.swipeSensitivity = arg.swipeSensitivity;
        this.maxWorkWidth = arg.maxWorkWidth;
        this.baseXStateModifier = this.checkBaseStateIsNegative('x') ? -1 : 1;
        this.baseYStateModifier = this.checkBaseStateIsNegative('y') ? -1 : 1;
        this.minSwipeWidth = Math.trunc(this.swipableElement.clientWidth * this.swipeSensitivity);
        this.minSwipeHeight = Math.trunc(this.swipableElement.clientHeight * this.swipeSensitivity);
        this.changePlane = arg.changePlane;
        if (this.changePlane == ChangePlane.ToLeft || this.changePlane == ChangePlane.ToRight) {
            this.changeOrientation = ChangeOrientation.Horizontal;
        }
        else {
            this.changeOrientation = ChangeOrientation.Vertical;
        }
        this.checkMaxWorkWidth();
        this.touchAreaElement.addEventListener('pointerdown', (e) => {
            if (e.button != 0)
                return;
            this.swipeStart(e);
            window.addEventListener('pointermove', this.pointerMoveHandler, false);
            window.addEventListener('pointerup', this.pointerUpHandler, false);
        }, false);
    }
    swipeStart(e) {
        this.startX = e.clientX;
        this.startY = e.clientY;
    }
    swipeMove(e) {
        if (this.changeOrientation == ChangeOrientation.Horizontal) {
            this.deltaX = this.startX - e.clientX;
            this.currentSide = this.deltaX >= 0 ? SwipeSide.Left : SwipeSide.Right;
            this.deltaX = Math.abs(this.deltaX);
            this.moveX();
        }
        else if (this.changeOrientation == ChangeOrientation.Vertical) {
            this.deltaY = this.startY - e.clientY;
            this.currentSide = this.deltaY >= 0 ? SwipeSide.Top : SwipeSide.Bottom;
            this.deltaY = Math.abs(this.deltaY);
            this.moveY();
        }
    }
    swipeEnd(delta, changeTo, isSwipeEnd) {
        if (this.changeOrientation == ChangeOrientation.Horizontal && delta > this.minSwipeWidth
            || this.changeOrientation == ChangeOrientation.Vertical && delta > this.minSwipeHeight) {
            changeTo ? this.swipableElement.classList.add('active') : this.swipableElement.classList.remove('active');
            this.touchAreaElement.classList.toggle('active');
            this.swipableElement.style.transform = ``;
            window.removeEventListener('pointermove', this.pointerMoveHandler, false);
        }
        if (isSwipeEnd) {
            this.swipableElement.style.transform = ``;
            window.removeEventListener('pointermove', this.pointerMoveHandler, false);
        }
    }
    moveX(delta = this.deltaX) {
        if (!this.checkSwipableElementContainActive()) {
            if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Right)
                return;
            if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Left)
                return;
            let result = this.elementStartX - delta * this.baseXStateModifier;
            this.swipableElement.style.transform = `translate3d(
				${result}px, 
				${this.getTranslateState('Y')}px, 
				0)`;
            this.swipeEnd(delta, true);
        }
        else {
            if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Left)
                return;
            if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Right)
                return;
            let operator = this.changePlane == ChangePlane.ToLeft ? '+' : '-';
            let result = `${operator}${delta}`;
            this.swipableElement.style.transform = `translate3d(
				${result}px,
				${this.getTranslateState('Y')}px, 
				0)`;
            this.swipeEnd(delta, false);
        }
    }
    moveY(delta = this.deltaY) {
        if (!this.checkSwipableElementContainActive()) {
            if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Top)
                return;
            if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Bottom)
                return;
            let result = this.elementStartY - delta * this.baseYStateModifier;
            this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`;
            this.swipeEnd(delta, true);
        }
        else {
            if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Top)
                return;
            if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Bottom)
                return;
            let operator = this.changePlane == ChangePlane.ToBottom ? '-' : '+';
            let result = `${operator}${delta}`;
            this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`;
            this.swipeEnd(delta, false);
        }
    }
    getTranslateState(xOrY = 'x') {
        let valueIndex = xOrY == 'x' ? 4 : 5;
        let state;
        // get a value of transformX or transformY of swipableElement
        try {
            state = parseInt(window.getComputedStyle(this.swipableElement)
                .getPropertyValue("transform")
                .match(/(-?[0-9\.]+)/g)[valueIndex]);
        }
        catch (error) {
            state = 0;
        }
        return state;
    }
    checkBaseStateIsNegative(xOrY = 'x') {
        let translateX = this.getTranslateState(xOrY);
        let xStateIsNegative = translateX >= 0 ? false : true;
        return xStateIsNegative;
    }
    checkSwipableElementContainActive() {
        return this.swipableElement.classList.contains('active');
    }
    checkMaxWorkWidth() {
        if (window.innerWidth <= this.maxWorkWidth) {
            this.touchAreaElement.style.pointerEvents = 'auto';
        }
        else {
            this.touchAreaElement.style.pointerEvents = 'none';
        }
    }
}