async function getCalls() {
    const response = await fetch('https://data.cityofnewyork.us/resource/erm2-nwe9.json');
    const calls = await response.json();
    const nypdEntries = calls.filter(entry => entry.agency === 'NYPD');
    const callNumber = 5
    const randomEntries = Array.from({ length: callNumber }, () => nypdEntries[Math.floor(Math.random() * nypdEntries.length)]);

    randomEntries.forEach((randomEntry, index) => {
        console.log(randomEntry)

        const callID = randomEntry.unique_key;
        const callIdElement = document.querySelector(`.call-id-${index} p`);
        callIdElement.innerHTML = `Complaint ID: ${callID}`;

        const complaintType = randomEntry.complaint_type;
        const complaintInfoElement = document.getElementById(`complaint-info-${index}`);
        complaintInfoElement.innerHTML = `Complaint: ${complaintType}`;

        const date = randomEntry.created_date.split('T')[0];
        const time = randomEntry.created_date.split('T')[1].substring(0, 8);
        const dateElement = document.getElementById(`date-${index}`);
        dateElement.innerHTML = `Date and Time:  ${date}, ${time}`;

        const addressInfo = `${randomEntry.incident_address}, ${randomEntry.borough}, ${randomEntry.incident_zip}`;
        const addressInfoElement = document.getElementById(`address-info-${index}`);
        addressInfoElement.innerHTML = `Address: ${addressInfo}`;

        const resolutionDescription = randomEntry.resolution_description;
        const resolutionDescriptionElement = document.getElementById(`resolution-description-${index}`);
        resolutionDescriptionElement.innerHTML = `Resolution Description: ${resolutionDescription}`;
    })
}

getCalls()

function refresh() {
    window.location.reload("Refresh")
}