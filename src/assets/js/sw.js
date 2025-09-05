// Check if the browser supports service workers and the beforeinstallprompt event
if ('serviceWorker' in navigator && 'beforeinstallprompt' in window) {
    // Register the service worker
    navigator.serviceWorker.register('/assets/js/sw.js').then(reg => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);

        document.getElementById('install-btn-section').style.display = 'block';
        addbeforeinstallprompt();

    }).catch(error => {
        console.error('Service worker registration failed:', error);
    });
}

function addbeforeinstallprompt(){

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the default install prompt
        event.preventDefault();

        let deferredPrompt = event;
        document.getElementById('install-btn').addEventListener('click', () => {
            deferredPrompt.prompt();

            // Wait for the user to make a choice
            deferredPrompt.userChoice.then((choiceResult) => {
                // Reset the deferredPrompt variable
                deferredPrompt = null;

                // Hide the install button after installation
                document.getElementById('installButton').style.display = 'none';

                // Log the user's choice (optional)
                console.log(choiceResult.outcome);
            });
        });
    });
}
