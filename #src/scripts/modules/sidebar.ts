import { elementIsExistWithLog } from "./general.js"

interface SidebarMenuArgs {
	/** Selector of sidebars. Should contain id of this sidebar. */
	selectorOfSidebars: string
	/** 
		Selector for buttons that open some sidebar. 
		Should contains `data-open-sidebar='sidebarId'`.
	*/
	selectorOfSidebarButtons: string
	swipeAreaSelector?: string
	sidebarsActiveClass?: string
	buttonsActiveClass?: string
}

export default class SidebarMenu {
	private sidebarButtons: NodeListOf<HTMLElement>
	private static swipeArea: HTMLElement
	public static sidebarsActiveClass: string = 'active'
	public static buttonsActiveClass: string = 'active'

	constructor(arg: SidebarMenuArgs) {
		if (!elementIsExistWithLog('SidebarMenu',
			arg.selectorOfSidebars, arg.selectorOfSidebarButtons)) {
			return
		}

		this.sidebarButtons = document.querySelectorAll(arg.selectorOfSidebarButtons)

		SidebarMenu.swipeArea = document.querySelector(arg.swipeAreaSelector) as HTMLElement

		if (arg.buttonsActiveClass)
			SidebarMenu.buttonsActiveClass = arg.buttonsActiveClass
		if (arg.sidebarsActiveClass)
			SidebarMenu.sidebarsActiveClass = arg.sidebarsActiveClass


		for (let sidebarBtn of this.sidebarButtons) {
			sidebarBtn.addEventListener('click', () =>
				this.toggleSidebar(sidebarBtn)
			)
		}
	}

	private toggleSidebar(eventButton: HTMLElement) {
		let sidebar = document.getElementById(eventButton.dataset.openSidebar) as HTMLElement

		eventButton.classList.toggle(SidebarMenu.buttonsActiveClass)
		sidebar.classList.toggle(SidebarMenu.sidebarsActiveClass)
		SidebarMenu.swipeArea.classList.toggle('active')
	}
}

