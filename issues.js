document.addEventListener('DOMContentLoaded', function() {
    console.log('issues.js loaded');
    const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];

    function saveEntry(type, brand, issue, description) {
        const problemNumber = savedEntries.length + 1;
        const entry = {
            problemNumber: problemNumber,
            type: type,
            brand: brand,
            issue: issue,
            description: description
        };
        savedEntries.push(entry);
        localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
        alert(`Problem ${problemNumber} (${type}) saved!`);
        window.location.href = 'savedissue.html';
    }

    const smartphoneForm = document.getElementById('smartphoneForm');
    if (smartphoneForm) {
        smartphoneForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const brand = document.getElementById('smartphoneBrand').value;
            const issue = document.getElementById('smartphoneIssue').value;
            const description = document.getElementById('smartphoneDescription').value;
            saveEntry('Smartphone', brand, issue, description);
        });
    }

    const laptopForm = document.getElementById('laptopForm');
    if (laptopForm) {
        laptopForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const brand = document.getElementById('laptopBrand').value;
            const issue = document.getElementById('laptopIssue').value;
            const description = document.getElementById('laptopDescription').value;
            saveEntry('Laptop', brand, issue, description);
        });
    }

    const smartwatchForm = document.getElementById('smartwatchForm');
    if (smartwatchForm) {
        smartwatchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const brand = document.getElementById('smartwatchBrand').value;
            const issue = document.getElementById('smartwatchIssue').value;
            const description = document.getElementById('smartwatchDescription').value;
            saveEntry('Smartwatch', brand, issue, description);
        });
    }
});
