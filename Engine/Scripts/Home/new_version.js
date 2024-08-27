document.addEventListener('DOMContentLoaded', function() {
    const alert = document.getElementById('alert');
    const dismissButton = document.getElementById('dismiss-button');
    const viewButton = document.getElementById('view-button');

    const currentVersion = '2.0.0';
    const storedVersion = localStorage.getItem('site_version');
    const lastViewTime = localStorage.getItem('last_view_time');
    const viewDelay = 24 * 60 * 60 * 1000; // 24 hours

   
    function shouldShowAlert() {
        // Check if the stored version is different or if the alert needs to be shown after 24 hours
        return currentVersion !== storedVersion || !lastViewTime || Date.now() - lastViewTime > viewDelay;
    }

    // Show the alert if conditions are met
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

        // Set version in localStorage to ensure alert does not show again until version changes
        localStorage.setItem('site_version', currentVersion);
    });

    viewButton.addEventListener('click', function() {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 500);

        // Store view time and current version
        localStorage.setItem('last_view_time', Date.now().toString());
        localStorage.setItem('site_version', currentVersion);
    });
});
