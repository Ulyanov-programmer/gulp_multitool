import { sleep, elementIsExistWithLog } from "./general.js";

interface TabArgs {
	/**
		Selector for buttons that open some tab content element.
		Must contain `data-toggle-elem-number="numberOfContentElement"`
		`(note, the count starts from zero)`
	*/
	btnsSelector: string
	/** Selector of blocks that contain some tab content.	*/
	contentBlocksSelector: string
	/** Sets the first element of buttons and content-block the class active. */
	activeFirstElements: boolean
}

export default class Tab {
	private buttons: NodeListOf<HTMLElement>
	private contentElements: NodeListOf<HTMLElement>
	private animationDuration: number
	private isToggling: boolean = false
	public buttonsActiveClass: string = 'active'
	public contentActiveClass: string = 'active'

	constructor(arg: TabArgs) {
		if (!elementIsExistWithLog('Tab', arg.btnsSelector, arg.contentBlocksSelector))
			return

		this.buttons = document.querySelectorAll(arg.btnsSelector);
		this.contentElements = document.querySelectorAll(arg.contentBlocksSelector)

		let someAccordContent = document.querySelector(arg.contentBlocksSelector);
		this.animationDuration = parseFloat(getComputedStyle(someAccordContent)
			.getPropertyValue('transition-duration')) * 1000 + 100

		if (this.buttons.length != this.contentElements.length) {
			console.log('[Tab] The count of buttons and content-elements is not equal.')
			return
		}

		if (arg.activeFirstElements) {
			this.buttons[0].classList.add('active');
			this.contentElements[0].classList.add('active');
		}

		for (let accordButton of this.buttons) {
			accordButton.addEventListener('click', () =>
				this.toggleActiveElements(accordButton)
			)
		}
		for (let accordContentElem of this.contentElements) {
			if (accordContentElem.classList.contains('active') == false) {
				accordContentElem.setAttribute('hidden', '');
				accordContentElem.style.display = 'none'
			}
		}
	}


	private toggleActiveElements(activeAccordButton: HTMLElement) {
		if (activeAccordButton.classList.contains('active') || this.isToggling) {
			return
		} else {
			this.isToggling = true;
		}
		for (let accordBtn of this.buttons) {
			accordBtn.classList.remove('active');
		}
		activeAccordButton.classList.add('active');


		let activeContentElement: HTMLElement = this.contentElements[activeAccordButton.dataset.toggleElemNumber];

		for (let contentElement of this.contentElements) {
			contentElement.classList.remove('active');

			setTimeout(async () => {
				if (contentElement != activeContentElement) {
					contentElement.setAttribute('hidden', '');
					contentElement.style.display = 'none'
				} else {
					contentElement.removeAttribute('hidden');
					contentElement.style.display = ''
				}

				await sleep(30)

				activeContentElement.classList.add('active');
				this.isToggling = false;

			}, this.animationDuration);
		}
	};
}