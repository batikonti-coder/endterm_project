$(document).ready(function () {

    $(".faq-title").on("click", function () {
        const $title = $(this);
        const $answer = $title.next(".faq-text");

        const $otherItems = $title.parent().siblings();
        $otherItems.find(".faq-text").slideUp();
        $otherItems.find(".faq-icon").text("+");

        const wasOpen = $answer.is(":visible");
        $answer.slideToggle();
        $title.find(".faq-icon").text(wasOpen ? "+" : "−");
    });

    const $modal = $("#gallery-modal");

    function closeModal() {
        $modal.fadeOut(200);
    }
    $("img.gallery-img").on("click", function () {
        const $img = $(this);
        const title = $img.closest(".card").find(".card-title").text();

        $("#gallery-modal-img").attr("src", $img.attr("src")).attr("alt", $img.attr("alt"));
        $("#gallery-modal-caption").text(title);
        $modal.fadeIn(200);
    });

    $("[data-close='modal']").on("click", closeModal);

    $modal.on("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });
    $(document).on("keydown", function (event) {
        if (event.key === "Escape" && $modal.is(":visible")) {
            closeModal();
        }
    });

    const $toTop = $('<button type="button" id="to-top" class="btn btn-primary" aria-label="Back to top">↑</button>');
    $("body").append($toTop);

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
            $toTop.fadeIn();
        } else {
            $toTop.fadeOut();
        }
    });

    $toTop.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });
});
