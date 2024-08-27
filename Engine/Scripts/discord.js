document.addEventListener('DOMContentLoaded', function () {
    const discordContainer = document.querySelector('.discord-container');
    const discordExpanded = document.querySelector('.discord-expanded');
    const closeButton = document.getElementById('close-button');

    function toggleDiscordContainer() {
        discordExpanded.classList.toggle('show');
    }

    discordContainer.addEventListener('click', toggleDiscordContainer);

    closeButton.addEventListener('click', function () {
        setTimeout(function () {
            discordExpanded.classList.remove('show');
        }, 300);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            discordExpanded.classList.remove('show');
        }
    });

    document.addEventListener('click', function (event) {
        if (!discordContainer.contains(event.target) && !discordExpanded.contains(event.target)) {
            discordExpanded.classList.remove('show');
        }
    });
});
