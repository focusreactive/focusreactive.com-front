import $ from "jquery";
import "slick-carousel";
import { ISHIDDEN } from "./_constants";

export function slider() {
	const SLIDER = $(".js-slider");

	SLIDER.each(function () {
		let el = $(this);
		let prevBtn = el.parents(".js-slider-parent").find(".js-prev-btn");
		let nextBtn = el.parents(".js-slider-parent").find(".js-next-btn");
		let $status = $(".js-slider-amount");

		el.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			if (prevBtn.hasClass("is-extreme") || nextBtn.hasClass("is-extreme")) {
				let i = (nextSlide ? nextSlide : 0) + 1;
				if (i === 1) {
					prevBtn.addClass(ISHIDDEN);
					nextBtn.removeClass(ISHIDDEN);
				} else if (i === slick.slideCount) {
					nextBtn.addClass(ISHIDDEN);
					prevBtn.removeClass(ISHIDDEN);
				} else {
					nextBtn.addClass(ISHIDDEN);
					prevBtn.addClass(ISHIDDEN);
				}
			}
		});
		el.on(
			"init reInit afterChange",
			function (event, slick, currentSlide, nextSlide) {
				let i = (currentSlide ? currentSlide : 0) + 1;
				$status.text(i + " / " + slick.slideCount);
			}
		);

		el.slick({
			slidesToScroll: 1,
			slidesToShow: 1,
			rows: 1,
			prevArrow: prevBtn,
			nextArrow: nextBtn,
		});
	});
}
