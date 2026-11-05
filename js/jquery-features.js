// jQuery features: FAQ accordion, photo viewer and "back to top" button

$(document).ready(function () {

    // ---------- 1. FAQ accordion (about.html) ----------
    // class selector + traversal: next(), parent(), siblings(), find()
    $(".faq-title").on("click", function () {
        const $title = $(this);
        const $answer = $title.next(".faq-text");

        // close all other answers
        const $otherItems = $title.parent().siblings();
        $otherItems.find(".faq-text").slideUp();
        $otherItems.find(".faq-icon").text("+");

        // open / close this answer (check state before the animation starts)
        const wasOpen = $answer.is(":visible");
        $answer.slideToggle();
        $title.find(".faq-icon").text(wasOpen ? "+" : "−");
    });

    // ---------- 2. Photo viewer (destinations.html) ----------
    const $modal = $("#gallery-modal"); // ID selector

    function closeModal() {
        $modal.fadeOut(200);
    }

    // element + class selector
    $("img.gallery-img").on("click", function () {
        const $img = $(this);
        // closest() finds the card, then find() gets the title inside it
        const title = $img.closest(".card").find(".card-title").text();

        $("#gallery-modal-img").attr("src", $img.attr("src")).attr("alt", $img.attr("alt"));
        $("#gallery-modal-caption").text(title);
        $modal.fadeIn(200);
    });

    // attribute selector: close button
    $("[data-close='modal']").on("click", closeModal);

    // click on the dark background (not on the photo) also closes
    $modal.on("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Escape key closes the viewer
    $(document).on("keydown", function (event) {
        if (event.key === "Escape" && $modal.is(":visible")) {
            closeModal();
        }
    });

    // ---------- 3. "Back to top" button (all pages) ----------
    // The button is created with jQuery and added to the page
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
