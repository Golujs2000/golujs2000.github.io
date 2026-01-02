// Location-based pricing logic
// Fetches user country and updates prices for Western audiences (US/EU) to USD.

async function updatePricesBasedOnLocation() {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        const data = await response.json();
        const country = data.country; // 2-letter ISO code

        // List of countries to show USD pricing
        const westernCountries = [
            'US', 'CA', 'GB', 'AU', 'NZ', 'IE', // Anglosphere
            'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IT',
            'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO' // Europe
        ];

        if (westernCountries.includes(country)) {
            // Helper function to update text content safely
            const setPrice = (id, price) => {
                const el = document.getElementById(id);
                if (el) el.textContent = price;
            };

            // Main Packages
            setPrice('price-basic', '$198');
            setPrice('price-standard', '$298');
            setPrice('price-premium', '$398');

            // Extensions / Renewals
            setPrice('price-hosting', '$99 / year');
            setPrice('price-content', '$49 / update request');

            // Domain Note
            setPrice('price-domain-note', '$10-15/year');

            // Ads Packages (Add-ons)
            // Note: Targeting both "price-ads-google" (packages.html) and "price-google" (ads.html) style IDs just in case, 
            // though we will standardize to the ID present in the file.

            // Standardizing IDs in Javascript to match what we put in HTML:
            // Google
            setPrice('price-google', '$99');      // ads.html
            setPrice('price-ads-google', '$99');  // packages.html / index.html

            // Instagram
            setPrice('price-instagram', '$79');
            setPrice('price-ads-insta', '$79');

            // Facebook
            setPrice('price-facebook', '$79');
            setPrice('price-ads-fb', '$79');

            // Combo
            setPrice('price-combo', '$199');
            setPrice('price-ads-combo', '$199');

            // Analytics / Misc
            setPrice('price-zero', '$0');
            setPrice('price-testimonial-savings', '$600');
        }
    } catch (error) {
        console.log('Location detection failed, using default pricing');
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updatePricesBasedOnLocation();
});

// Also run immediately in case DOMContentLoaded already fired (if script is defer/at bottom)
if (document.readyState === 'loading') {
    // waiting for event
} else {
    updatePricesBasedOnLocation();
}
