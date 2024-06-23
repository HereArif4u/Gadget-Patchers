document.addEventListener('DOMContentLoaded', function() {
    const appointmentsList = document.getElementById('appointmentsList');
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    appointments.forEach((appointment, index) => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.className = 'appointment';
        appointmentDiv.innerHTML = `
            <h2>Problem ${appointment.problemNumber} (${appointment.type})</h2>
            <p><strong>Device Type:</strong> ${appointment.type}</p>
            <p><strong>Brand:</strong> ${appointment.brand}</p>
            <p><strong>Issue:</strong> ${appointment.issue}</p>
            <p><strong>Store Name:</strong> ${appointment.storeName}</p>
            <p><strong>Cost Estimate:</strong> ${appointment.costEstimate}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Status:</strong> <span class="status">${appointment.status}</span></p>
            <button onclick="updateStatus(${index}, 'In Progress')">Start Repair</button>
            <button onclick="updateStatus(${index}, 'Completed')">Complete Repair</button>
        `;
        appointmentsList.appendChild(appointmentDiv);
    });
});

function updateStatus(index, status) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments[index].status = status;
    localStorage.setItem('appointments', JSON.stringify(appointments));
    location.reload();
}
