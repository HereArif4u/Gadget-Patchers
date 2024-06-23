document.addEventListener('DOMContentLoaded', function() {
    const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
    const problemSelect = document.getElementById('problemSelect');
    const problemDetails = document.getElementById('problemDetails');
    const enableLocationBtn = document.getElementById('enableLocationBtn');
    const mapDiv = document.getElementById('map');
    const repairShopDetailsDiv = document.getElementById('repairShopDetails');
    const bookingModal = document.getElementById('bookingModal');
    const modalCloseBtn = document.getElementsByClassName('close')[0];
    const bookingForm = document.getElementById('bookingForm');
    const costEstimate = document.getElementById('costEstimate');
    const storeNameDisplay = document.getElementById('storeName');
    let selectedEntry;
    let map;
    let placesService;

    // Populate the dropdown list with saved problems
    savedEntries.forEach((entry, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Problem ${entry.problemNumber} (${entry.type}): ${entry.brand} - ${entry.issue}`;
        problemSelect.appendChild(option);
    });

    // Display the selected problem details and show the enable location button
    problemSelect.addEventListener('change', function() {
        const index = this.value;
        if (index) {
            selectedEntry = savedEntries[index];
            alert(`Selected problem ${selectedEntry.problemNumber} (${selectedEntry.type})`);
            problemDetails.innerHTML = `
                <p>Problem ${selectedEntry.problemNumber}</p>
                <p><strong>Device Type:</strong> ${selectedEntry.type}</p>
                <p><strong>Brand:</strong> ${selectedEntry.brand}</p>
                <p><strong>Issue:</strong> ${selectedEntry.issue}</p>
                <p><strong>Description:</strong> ${selectedEntry.description}</p>
            `;
            enableLocationBtn.style.display = 'block';
        } else {
            problemDetails.innerHTML = '';
            enableLocationBtn.style.display = 'none';
            repairShopDetailsDiv.style.display = 'none';
            mapDiv.style.display = 'none';
        }
    });

    // Get the user's location and show the map with nearby repair stores
    enableLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showMap, showError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    function showMap(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map = new google.maps.Map(mapDiv, {
            center: { lat: lat, lng: lng },
            zoom: 12
        });
        mapDiv.style.display = 'block';

        const request = {
            location: { lat: lat, lng: lng },
            radius: '5000',
            keyword: `${selectedEntry.type} repair store`
        };

        placesService = new google.maps.places.PlacesService(map);
        placesService.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                repairShopDetailsDiv.innerHTML = '<h3>Nearby Repair Shops:</h3>';
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    displayRepairShopDetails(results[i]);
                }
                repairShopDetailsDiv.style.display = 'block';
            } else {
                repairShopDetailsDiv.innerHTML = '<p>No nearby repair shops found.</p>';
            }
        });

        function createMarker(place) {
            const marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                const infowindow = new google.maps.InfoWindow({
                    content: `<strong>${place.name}</strong><br>${place.vicinity}`
                });
                infowindow.open(map, marker);
            });
        }

        function displayRepairShopDetails(place) {
            const shopDiv = document.createElement('div');
            shopDiv.innerHTML = `
                <p><strong>${place.name}</strong><br>
                ${place.vicinity}<br>
                Rating: ${place.rating || 'N/A'}</p>
            `;
            shopDiv.className = 'shop-details';
            shopDiv.onclick = function() {
                showModal(place.name);
            };
            repairShopDetailsDiv.appendChild(shopDiv);
        }
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.');
                break;
        }
    }

    // Modal logic
    function showModal(storeName) {
        storeNameDisplay.textContent = storeName;
        costEstimate.textContent = calculateCost(selectedEntry.type, selectedEntry.issue);
        bookingModal.style.display = 'block';
    }

    modalCloseBtn.onclick = function() {
        bookingModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
    }

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const appointment = {
            problemNumber: selectedEntry.problemNumber,
            type: selectedEntry.type,
            brand: selectedEntry.brand,
            issue: selectedEntry.issue,
            storeName: storeNameDisplay.textContent,
            costEstimate: costEstimate.textContent,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            status: 'Pending'
        };

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert(`Appointment booked! A fee of 50rs has been charged.`);
        bookingModal.style.display = 'none';

        // Redirect to appointment status page
        window.location.href = 'repairstatus.html';
    });

    function calculateCost(type, issue) {
        // Simple example of cost estimation logic
        let baseCost = 0;
        switch (type) {
            case 'Smartphone':
                baseCost = 500;
                break;
            case 'Laptop':
                baseCost = 1000;
                break;
            case 'Smartwatch':
                baseCost = 300;
                break;
            default:
                baseCost = 400;
        }
        // Additional cost based on issue severity
        if (issue.toLowerCase().includes('screen')) {
            baseCost += 200;
        } else if (issue.toLowerCase().includes('battery')) {
            baseCost += 100;
        } else if (issue.toLowerCase().includes('software')) {
            baseCost += 50;
        }
        return baseCost + 'rs';
    }

    window.initMap = function() {
        // Map initialization logic here if needed
    };
});
