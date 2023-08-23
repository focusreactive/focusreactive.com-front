import $ from "jquery";
import { WINDOW } from "./_constants";

export default function videoLazy() {
	WINDOW.on("load", function () {
		$("video source").each(function () {
			var sourceFile = $(this).attr("data-src");
			$(this).attr("src", sourceFile);
			var video = this.parentElement;
			video.load();
			video.play();
		});
	});
}
