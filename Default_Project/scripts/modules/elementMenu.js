import { isNullOrWhiteSpaces } from "./general.js";
export default class ElementModal {
    /**
     * Provides the ability to use modals over elements.
     *
     * @param contentElementsSelector
     * Elements over which the modal should be.
     * @param modalElementSelector
     * Selector for the modal that will appear above the content elements.
     * @param animationDuration
     * Animation duration in ms, unless you want the modal to open and close too quickly.
     *
     * @throws Some selector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     */
    constructor(contentElementsSelector, modalElementSelector, animationDuration) {
        if (isNullOrWhiteSpaces(contentElementsSelector, modalElementSelector) || animationDuration < 0) {
            throw '[ELEMENT-MODAL] Incorrect arguments!';
        }
        this.contentElements = document.querySelectorAll(contentElementsSelector);
        this.modalElement = document.querySelector(modalElementSelector);
        for (const contentEl of this.contentElements) {
            contentEl.addEventListener('mouseenter', () => {
                this.appendModalMenu(contentEl, this.modalElement);
            });
            contentEl.addEventListener('mouseleave', () => {
                this.removeModalMenu(contentEl, animationDuration);
            });
        }
    }
    appendModalMenu(contentElement, modalElement) {
        let modalElementClone = modalElement.cloneNode(true);
        contentElement.append(modalElementClone);
        setTimeout(() => {
            modalElementClone.classList.remove('_non-active');
        }, 30);
    }
    removeModalMenu(contentElement, animationDuration) {
        // Try to get modal block.
        let modalMenu = contentElement.lastElementChild;
        if (modalMenu) {
            modalMenu.classList.add('_non-active');
            setTimeout(() => {
                modalMenu.remove();
            }, animationDuration + 100);
        }
    }
}
