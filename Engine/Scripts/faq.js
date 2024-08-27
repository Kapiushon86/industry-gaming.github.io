document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", function() {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                item.classList.add("inactive");
            } else {
                item.classList.add("active");
                item.classList.remove("inactive");
            }
        });
    });
});
