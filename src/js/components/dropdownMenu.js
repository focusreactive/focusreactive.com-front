import $ from "jquery";
import { ISOPEN, ISFOCUS } from "./_constants";

export function dropdownMenu() {
	let link = $(".menu__link");
	let dropdownBtn = $(".js-btn-dropdown");

	$(dropdownBtn).on("click", function () {
		$(this).closest("li").find(".js-nav-dropdown").toggleClass(ISOPEN);
		return false;
	});
	$(link).on("mouseenter", function (e) {
		$(".menu__item").not($(this).closest(".menu__item")).removeClass(ISFOCUS);
	});
	$(link).on("keyup ", function (e) {
		var code = e.keyCode ? e.keyCode : e.which;
		if (code === 9) {
			$(".menu__item")
				.not($(this).closest(".menu__item"))
				.removeClass(ISFOCUS);
			$(this).closest("li").addClass(ISFOCUS);
		}
	});
}
