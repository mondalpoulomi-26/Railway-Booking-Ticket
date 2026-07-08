const trainRoutes = {
    "Rajdhani Express|12301|1450": [
        "Kolkata",
        "Dhanbad",
        "Gaya",
        "Kanpur",
        "New Delhi"
    ],

    "Shatabdi Express|12001|950": [
        "New Delhi",
        "Ambala",
        "Chandigarh"
    ],

    "Duronto Express|12213|1200": [
        "Kolkata",
        "Bhubaneswar",
        "Visakhapatnam",
        "Chennai"
    ],

    "Vande Bharat Express|22436|1800": [
        "New Delhi",
        "Agra",
        "Jhansi",
        "Bhopal"
    ]
};
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("bookingForm");
    const trainSelect = document.getElementById("train");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const passengerCount = document.getElementById("passengerCount");
const passengerContainer = document.getElementById("passengerContainer");
passengerCount.addEventListener("change", generatePassengers);

generatePassengers();
trainSelect.addEventListener("change", () => {

    const stations = trainRoutes[trainSelect.value] || [];

    fromSelect.innerHTML = '<option value="">Select Station</option>';
    toSelect.innerHTML = '<option value="">Select Station</option>';

    stations.forEach(station => {

        fromSelect.innerHTML += `<option value="${station}">${station}</option>`;
        toSelect.innerHTML += `<option value="${station}">${station}</option>`;

    });

});

// ==========================
// STEP 3
// ==========================

function generatePassengers() {

    passengerContainer.innerHTML = "";

    let count = Number(passengerCount.value);

    // Passenger 1 is already in the main form
    for (let i = 2; i <= count; i++) {

        passengerContainer.innerHTML += `

        <div class="extraPassenger">

            <h3>Passenger ${i}</h3>

            <div class="row">

                <div class="input-box">
                    <label>Name</label>
                    <input type="text" class="pname" required>
                </div>

                <div class="input-box">
                    <label>Age</label>
                    <input type="number" class="page" required>
                </div>

                <div class="input-box">
                    <label>Gender</label>

                    <select class="pgender">

                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                    </select>

                </div>

            </div>

        </div>

        `;
    }
}

const ticket = document.getElementById("ticket");
    const coaches = ["A1","A2","A3","B1","B2","B3","S1","S2","S3","S4"];
    const berths = ["Lower","Middle","Upper","Side Lower","Side Upper"];

    function randomPNR(){
        return Math.floor(1000000000 + Math.random()*9000000000);
    }

    function randomTicket(){
        return Math.random().toString(36).substring(2,10).toUpperCase();
    }

    function randomSeat(){
        return Math.floor(Math.random()*72)+1;
    }

    function randomCoach(){
        return coaches[Math.floor(Math.random()*coaches.length)];
    }

    function randomBerth(){
        return berths[Math.floor(Math.random()*berths.length)];
    }

    function bookingTime(){
        return new Date().toLocaleString();
    }

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name=document.getElementById("name").value;
        const age=document.getElementById("age").value;
        const gender=document.getElementById("gender").value;
        // Store all passengers
const passengers = [];

// Passenger 1
passengers.push({
    name: name,
    age: age,
    gender: gender
});

// Passenger 2,3,4...
document.querySelectorAll(".extraPassenger").forEach(card => {

    passengers.push({

        name: card.querySelector(".pname").value,
        age: card.querySelector(".page").value,
        gender: card.querySelector(".pgender").value

    });

});

        const train=document.getElementById("train").value;
        const from=document.getElementById("from").value;
        const to=document.getElementById("to").value;

        const date = document.getElementById("date").value;
const travelClass = document.getElementById("travelClass").value;

// Check same station
if (from === to) {
    alert("From and To stations cannot be the same.");
    return;
}



// Check past date
const selectedDate = new Date(date);
const today = new Date();

// Remove time from today's date
today.setHours(0, 0, 0, 0);

if (selectedDate < today) {
    alert("❌ Past dates are not allowed. Please select today or a future date.");
    return;
}
        const trainData=train.split("|");

        const trainName=trainData[0];
        const trainNo=trainData[1];
        const fare=trainData[2];

        let passengerHTML = "";

passengers.forEach((p, index) => {

    passengerHTML += `
        <p>
            <strong>Passenger ${index + 1}</strong><br>
            ${p.name}<br>
            Age : ${p.age}<br>
            Gender : ${p.gender}
        </p>
    `;

});

document.getElementById("tPassengers").innerHTML = passengerHTML;

        document.getElementById("tTrain").textContent=trainName;
        document.getElementById("tTrainNo").textContent=trainNo;

        document.getElementById("tPNR").textContent=randomPNR();
        document.getElementById("tTicket").textContent=randomTicket();

        document.getElementById("tFrom").textContent=from;
        document.getElementById("tTo").textContent=to;

        document.getElementById("tDate").textContent=date;

        document.getElementById("tClass").textContent=travelClass;

        document.getElementById("tCoach").textContent=randomCoach();
        document.getElementById("tSeat").textContent=randomSeat();
        document.getElementById("tBerth").textContent=randomBerth();

        document.getElementById("tFare").textContent=fare;

        document.getElementById("tTime").textContent=bookingTime();

        ticket.style.display="block";

        document.getElementById("qrcode").innerHTML="";

        new QRCode(document.getElementById("qrcode"),{
            text:
            "Passenger : "+name+
            "\nPNR : "+document.getElementById("tPNR").textContent+
            "\nTrain : "+trainName+
            "\nFrom : "+from+
            "\nTo : "+to+
            "\nDate : "+date,
            width:150,
            height:150
        });

        ticket.scrollIntoView({
            behavior:"smooth"
        });

        form.reset();

    });

});



// ================================
// DOWNLOAD PDF
// ================================

function downloadTicket() {

    const ticket = document.getElementById("ticketContent");

    const options = {

        margin: 5,

        filename: "Indian_Railway_E_Ticket.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 3,
            useCORS: true,
            scrollY: 0,
            windowWidth: document.body.scrollWidth,
            windowHeight: document.body.scrollHeight
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },

        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
        }

    };

    html2pdf()
        .from(ticket)
        .set(options)
        .save();
}

// ================================
// PRINT TICKET
// ================================

function printTicket() {

    const ticket = document.getElementById("ticketContent").innerHTML;

    const printWindow = window.open("", "", "width=900,height=700");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Indian Railway Ticket</title>

            <style>

                body{

                    font-family:Arial,sans-serif;
                    padding:30px;
                    background:white;
                }

                h2{

                    text-align:center;
                    color:#003566;
                }

                .ticket-grid{

                    display:grid;
                    grid-template-columns:repeat(2,1fr);
                    gap:15px;
                    margin-top:20px;
                }

                .ticket-grid p{

                    border:1px solid #ddd;
                    padding:10px;
                    border-radius:5px;
                }

                #qrcode{

                    margin-top:30px;
                    text-align:center;
                }

            </style>

        </head>

        <body>

            ${ticket}

        </body>

        </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();

}

// ================================
// MINIMUM JOURNEY DATE = TODAY
// ================================

window.onload = function(){

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("date").setAttribute("min", today);

};
