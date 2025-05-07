// DOM Elements
const profileNavItems = document.querySelectorAll('.profile-nav-item');
const profileTabs = document.querySelectorAll('.profile-tab');
const viewAllOrdersBtn = document.querySelector('.view-all-btn');

// Handle profile navigation
if (profileNavItems.length && profileTabs.length) {
    profileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.classList.contains('logout')) {
                // Handle logout (in a real app, this would log the user out)
                alert('Logging out...');
                return;
            }
            
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            
            // Remove active class from all items and tabs
            profileNavItems.forEach(i => i.classList.remove('active'));
            profileTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked item and corresponding tab
            item.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Handle "View All Orders" button
if (viewAllOrdersBtn) {
    viewAllOrdersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = viewAllOrdersBtn.getAttribute('data-tab');
        
        // Remove active class from all items and tabs
        profileNavItems.forEach(i => i.classList.remove('active'));
        profileTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to orders nav item and tab
        document.querySelector(`.profile-nav-item[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
}

// Handle avatar edit
const avatarEdit = document.querySelector('.avatar-edit');
if (avatarEdit) {
    avatarEdit.addEventListener('click', () => {
        // In a real app, this would open a file picker
        alert('This would open a file picker to change your profile picture.');
    });
}

// Handle address actions
const addressActions = document.querySelectorAll('.address-actions button');
if (addressActions.length) {
    addressActions.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('delete')) {
                // Confirm before deleting
                if (confirm('Are you sure you want to delete this address?')) {
                    // In a real app, this would delete the address
                    btn.closest('.address-card').remove();
                }
            } else if (btn.textContent.trim() === 'Edit') {
                // In a real app, this would open an edit form
                alert('This would open a form to edit the address.');
            } else if (btn.textContent.trim() === 'Set as Default') {
                // Remove default badge from current default
                const currentDefault = document.querySelector('.default-badge');
                if (currentDefault) {
                    currentDefault.remove();
                }
                
                // Add default badge to this address
                const header = btn.closest('.address-card').querySelector('.address-header');
                const badge = document.createElement('span');
                badge.className = 'default-badge';
                badge.textContent = 'Default';
                header.appendChild(badge);
                
                // Remove the "Set as Default" button
                btn.remove();
            }
        });
    });
}

// Handle add new address
const addNewAddressCard = document.querySelector('.address-card.add-new');
if (addNewAddressCard) {
    addNewAddressCard.addEventListener('click', () => {
        // In a real app, this would open a form to add a new address
        alert('This would open a form to add a new address.');
    });
}

// Handle form submissions
const forms = document.querySelectorAll('form');
if (forms.length) {
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would submit the form data
            alert('Form submitted successfully!');
        });
    });
}