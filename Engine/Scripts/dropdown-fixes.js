// Dropdown Hover Stability Fix
//
// Fixes and stabilizes the issue with the dropdowns disappearing after hovering on one when the dropdown is not present in the central area, mostly after first hover.

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const subDropdowns = document.querySelectorAll('.sub-dropdown');

    let closeDropdownTimeout;
    let closeSubDropdownTimeout;

    dropdowns.forEach(item => {
        const dropdownContent = item.querySelector('.dropdown-content');

        item.addEventListener('mouseenter', () => {
            dropdowns.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherDropdownContent = otherItem.querySelector('.dropdown-content');
                    otherDropdownContent.style.display = 'none';
                    otherDropdownContent.style.opacity = '0';
                    otherDropdownContent.style.visibility = 'hidden';
                }
            });

            clearTimeout(closeDropdownTimeout);
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
        });

        item.addEventListener('mouseleave', () => {
            closeDropdownTimeout = setTimeout(() => {
                if (!dropdownContent.matches(':hover')) {
                    dropdownContent.style.display = 'none';
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                }
            }, 300);  
        });

        dropdownContent.addEventListener('mouseenter', () => {
            clearTimeout(closeDropdownTimeout);
        });

        dropdownContent.addEventListener('mouseleave', () => {
            closeDropdownTimeout = setTimeout(() => {
                dropdownContent.style.display = 'none';
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
            }, 300);
        });
    });

    subDropdowns.forEach(item => {
        const subDropdownContent = item.querySelector('.sub-dropdown-content');

        item.addEventListener('mouseenter', () => {
            subDropdowns.forEach(subItem => {
                const subContent = subItem.querySelector('.sub-dropdown-content');
                if (subContent !== subDropdownContent) {
                    subContent.style.display = 'none';
                    subContent.style.opacity = '0';
                    subContent.style.visibility = 'hidden';
                }
            });

            clearTimeout(closeSubDropdownTimeout);
            subDropdownContent.style.display = 'block';
            subDropdownContent.style.opacity = '1';
            subDropdownContent.style.visibility = 'visible';
        });

        item.addEventListener('mouseleave', () => {
            closeSubDropdownTimeout = setTimeout(() => {
                if (!item.matches(':hover') && !item.parentNode.matches(':hover')) {
                    subDropdownContent.style.display = 'none';
                    subDropdownContent.style.opacity = '0';
                    subDropdownContent.style.visibility = 'hidden';
                }
            }, 300); 
        });

        subDropdownContent.addEventListener('mouseenter', () => {
            clearTimeout(closeSubDropdownTimeout);
        });

        subDropdownContent.addEventListener('mouseleave', () => {
            closeSubDropdownTimeout = setTimeout(() => {
                subDropdownContent.style.display = 'none';
                subDropdownContent.style.opacity = '0';
                subDropdownContent.style.visibility = 'hidden';
            }, 300);
        });
    });
});


// Mobile Click Event Fix
//
// Fixes the dropdown not closing when clicked outside the submenus on mobile devices.

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const subDropdowns = document.querySelectorAll('.sub-dropdown');

    let closeDropdownTimeout;
    let closeSubDropdownTimeout;

    dropdowns.forEach(item => {
        const dropdownContent = item.querySelector('.dropdown-content');

        item.addEventListener('mouseenter', () => {
            clearTimeout(closeDropdownTimeout);
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
        });

        item.addEventListener('mouseleave', () => {
            closeDropdownTimeout = setTimeout(() => {
                if (!dropdownContent.matches(':hover')) {
                    dropdownContent.style.display = 'none';
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                }
            }, 300);  
        });

        dropdownContent.addEventListener('mouseenter', () => {
            clearTimeout(closeDropdownTimeout);
        });

        dropdownContent.addEventListener('mouseleave', () => {
            closeDropdownTimeout = setTimeout(() => {
                dropdownContent.style.display = 'none';
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
            }, 300);
        });
    });

    subDropdowns.forEach(item => {
        const subDropdownContent = item.querySelector('.sub-dropdown-content');

        item.addEventListener('mouseenter', () => {
            subDropdowns.forEach(subItem => {
                const subContent = subItem.querySelector('.sub-dropdown-content');
                if (subContent !== subDropdownContent) {
                    subContent.style.display = 'none';
                    subContent.style.opacity = '0';
                    subContent.style.visibility = 'hidden';
                }
            });

            clearTimeout(closeSubDropdownTimeout);
            subDropdownContent.style.display = 'block';
            subDropdownContent.style.opacity = '1';
            subDropdownContent.style.visibility = 'visible';
        });

        item.addEventListener('mouseleave', () => {
            closeSubDropdownTimeout = setTimeout(() => {
                if (!subDropdownContent.matches(':hover')) {
                    subDropdownContent.style.display = 'none';
                    subDropdownContent.style.opacity = '0';
                    subDropdownContent.style.visibility = 'hidden';
                }
            }, 300); 
        });

        subDropdownContent.addEventListener('mouseenter', () => {
            clearTimeout(closeSubDropdownTimeout);
        });

        subDropdownContent.addEventListener('mouseleave', () => {
            closeSubDropdownTimeout = setTimeout(() => {
                subDropdownContent.style.display = 'none';
                subDropdownContent.style.opacity = '0';
                subDropdownContent.style.visibility = 'hidden';
            }, 300);
        });
    });

    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    document.addEventListener('touchend', function(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const touchDistance = Math.hypot(touchEndX - touchStartX, touchEndY - touchStartY);

        if (touchDistance < 10) {
            let isClickInsideDropdown = false;

            dropdowns.forEach(item => {
                if (item.contains(event.target)) {
                    isClickInsideDropdown = true;
                }
            });

            if (!isClickInsideDropdown) {
                closeAllDropdowns();
            }
        }
    });

    function closeAllDropdowns() {
        dropdowns.forEach(item => {
            const dropdownContent = item.querySelector('.dropdown-content');
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
        });

        subDropdowns.forEach(item => {
            const subDropdownContent = item.querySelector('.sub-dropdown-content');
            subDropdownContent.style.display = 'none';
            subDropdownContent.style.opacity = '0';
            subDropdownContent.style.visibility = 'hidden';
        });
    }
});


