document.addEventListener('DOMContentLoaded', function() {
    const alert = document.getElementById('alert');
    const dismissButton = document.getElementById('dismiss-button');
    const viewButton = document.getElementById('view-button');

    const currentVersion = '2.0.0';
    const storedVersion = localStorage.getItem('site_version');

    // We Always want to clear previous version data if it dosnt match the current one, becuase why would you store extra info you dont need???
    // Also Ensures old data wont interfere with new data.
    if (storedVersion && currentVersion !== storedVersion) {
        localStorage.removeItem('site_version');
    }

    // We will show alert if current version is not stored for some reason. (it wont happen cus im pro coder)
    if (currentVersion !== localStorage.getItem('site_version')) {
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

        // Then last we will store the current version in localStorage to avoid showing the alert again for this the same exact version.
        localStorage.setItem('site_version', currentVersion);
    });

    viewButton.addEventListener('click', function() {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 500);
    });
});
