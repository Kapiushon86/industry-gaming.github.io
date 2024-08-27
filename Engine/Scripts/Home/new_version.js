document.addEventListener('DOMContentLoaded', function() {
    const alert = document.getElementById('alert');
    const dismissButton = document.getElementById('dismiss-button');
    const viewButton = document.getElementById('view-button');

    const currentVersion = '2.0.0';
    const storedVersion = localStorage.getItem('site_version');
    const lastViewTime = localStorage.getItem('last_view_time');
    const viewDelay = 24 * 60 * 60 * 1000; // 24 hours

    // We always want to clear previous version data if it doesn't match the current one,
    // because why would you store extra info you don't need?
    // Also ensures old data won't interfere with new data.
    if (storedVersion && currentVersion !== storedVersion) {
        localStorage.removeItem('site_version');
        localStorage.removeItem('last_view_time'); 
    }

    // We will show the alert if the current version is not stored or if 24 hours have passed
    // since the last view time, ensuring it won't show again until the conditions are met.
    if (currentVersion !== storedVersion || !lastViewTime || Date.now() - lastViewTime > viewDelay) {
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

        // Then last we will store the current version in localStorage to avoid showing the alert again for 
        // the same exact version.
        localStorage.setItem('site_version', currentVersion);
    });

   
    viewButton.addEventListener('click', function() {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 500);

        // Store the current view time to prevent showing the alert again for 24 hours,
        // and also store the current version to ensure the alert is reset for future versions.
        localStorage.setItem('last_view_time', Date.now().toString());
        localStorage.setItem('site_version', currentVersion);
    });
});
