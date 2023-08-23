import $ from "jquery";
import { ISOPEN, BODY, ISHIDDEN, ISACTIVE } from "./_constants";
import { addBodyHidden, removeBodyHidden } from "./bodyHiddenPosition.js";

export function clickFunctions() {
	let burger = $(".js-burger");
	let nav = $(".js-nav");

	$(burger).on("click", function () {
		if ($(this).hasClass(ISOPEN)) {
			$(this).removeClass(ISOPEN);
			$(nav).removeClass(ISOPEN);
			BODY.removeClass(ISHIDDEN);
			removeBodyHidden();
		} else {
			$(this).addClass(ISOPEN);
			$(nav).addClass(ISOPEN);
			addBodyHidden();
		}
	});

	const MENU_LINKS = nav.find(".js-nav-link");
	MENU_LINKS.on("click", function () {
		if (window.matchMedia("(max-width: 850px)").matches) {
			burger.removeClass(ISOPEN);
			nav.removeClass(ISOPEN);
			BODY.removeClass(ISHIDDEN);
			removeBodyHidden();

			MENU_LINKS.removeClass(ISACTIVE);
			$(this).addClass(ISACTIVE);
			let anchor = $(this);
			let scrollDest = $(anchor.attr("href"));

			if (scrollDest.length) {
				$("html, body")
					.stop()
					.animate(
						{
							scrollTop: scrollDest.offset().top + "px",
						},
						1000
					);
			}
		}
	});

	var scrollTimeout;
	var throttle = 500;
	$(window).on("resize", function () {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(function () {
				if (burger.hasClass(ISOPEN)) {
					if (window.matchMedia("(min-width: 850px)").matches) {
						BODY.removeClass(ISHIDDEN);
					} else {
						BODY.addClass(ISHIDDEN);
					}
				}
				scrollTimeout = null;
			}, throttle);
		}
	});
}
