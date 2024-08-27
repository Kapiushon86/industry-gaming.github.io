
// - If the "View Update" button is clicked, the alert will not appear again until the website version changes.
// - If the "Dismiss" button is clicked, the alert will not reappear for 24 hours, regardless of page refreshes, unless the website version changes, which will reset the 24-hour delay.

// When the page loads, the script checks if the alert should be displayed based on the current version and the last dismissal time.
// If the alert should be shown, it is displayed after a 2-second delay.
// Clicking "Dismiss" hides the alert and records the current timestamp to ensure it does not reappear for 24 hours.
// Clicking "View Update" hides the alert and updates the stored website version to prevent the alert from showing until the version changes.

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.getElementById('alert');
    const dismissButton = document.getElementById('dismiss-button');
    const viewButton = document.getElementById('view-button');

    const currentVersion = '2.0.0'; 
    const storedVersion = localStorage.getItem('site_version');
    const lastViewTime = localStorage.getItem('last_view_time');
    const viewDelay = 24 * 60 * 60 * 1000; 

    function parseTimestamp(timestamp) {
        return timestamp ? parseInt(timestamp, 10) : 0;
    }

    function shouldShowAlert() {
        const lastViewTimeInt = parseTimestamp(lastViewTime);
        return currentVersion !== storedVersion || !lastViewTime || Date.now() - lastViewTimeInt > viewDelay;
    }

    if (shouldShowAlert()) {
        setTimeout(() => {
            alert.classList.remove('hidden');
            alert.classList.add('show');
        }, 2000);
    }

    dismissButton.addEventListener('click', function() {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 500);

        localStorage.setItem('last_view_time', Date.now().toString());

        localStorage.setItem('site_version', currentVersion);
    });

    viewButton.addEventListener('click', function() {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 500);

        localStorage.setItem('site_version', currentVersion);
    });
});
