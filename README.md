# Senior Citizen Help Alert to Nearest Nurse 🩺

A life-saving application designed for senior citizens living alone. In the event of an emergency, the system identifies and notifies the nearest nurse, enabling prompt assistance. If the first nurse is unavailable, the system continues notifying the next nearest nurse until help is confirmed.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Flow](#system-flow)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

---

## Features

- **Real-Time Nurse Matching with Geo-Location**: Utilizes Google Maps Geolocation API to determine precise locations of patients and available nurses, ensuring accurate and efficient nurse matching.
- **Optimized Distance Calculation**: Uses the Google Distance Matrix API to find the shortest travel distance from the patient to the nurses, enabling quick identification of the nearest nurse.
- **Twilio SMS Integration**: Sends alerts via SMS to the nearest nurse. Nurses can respond with ‘YES’ or ‘NO’ to accept or reject, and if there's no response within a set time, the system moves on to notify the next nearest nurse.
- **Direct WhatsApp Communication**: Once a nurse accepts the alert, a WhatsApp chat link and QR code are generated, allowing direct communication between the nurse and the patient.
- **Firebase Authentication**: Ensures secure login and registration for patients and nurses, maintaining data integrity and security.
- **Polling for Nurse Response**: Automatically checks for nurse responses every few seconds. If the nurse does not respond within 20 minutes, the system proceeds to notify the next nearest nurse.

## System Flow

The system flow is represented in the flowchart below:


![Flowchart](https://github.com/AkshaySingh2005/NurseConnect/blob/main/diagram-export-11-14-2024-1_55_28-AM.png)



1. **Emergency Detected**: An emergency alert is triggered for the patient.
2. **Get Patient Location**: The system retrieves the patient's location using the Geolocation API.
3. **Get Nurses on Duty**: It identifies all available nurses.
4. **Track Nurses’ Locations**: The system tracks nurses' locations in real-time.
5. **Calculate Nearest Nurse**: Using the Google Distance Matrix API, the system calculates the nearest available nurse.
6. **Notify Nearest Nurse**: Sends an alert to the closest nurse via Twilio.
7. **Nurse Response**:
   - If the nurse **accepts**, a WhatsApp chat link is generated for further communication, and the process ends.
   - If the nurse **rejects** or there’s **no response within 20 minutes**, the system notifies the next nearest nurse.


## Tech Stack
- **Frontend**: React , Vite
- **Backend**: Node.js, Express.js
- **APIs**: Google Maps Geolocation API, Google Distance Matrix API, Twilio SMS API
- **Database**: Firebase,MongoDB
- **Other Libraries**: Axios, QR Code Generator API, Uppy for file uploads

## Setup Instructions


1.**Clone the Repository**:
   ```bash
   git clone https://github.com/AkshaySingh2005/NurseConnect.git\
   ```

   
1.  **Install Dependencies**:
    -   Install all pacakges from dependencies list 
    -   For the server:

        ```bash
        cd /server
        npm install

    -   For the client:

        ```bash
        cd  /client
        npm install

2.  **Setup Environment Variables**: Create `.env` files as per the [Environment Variables](#environment-variables) section.

3.  **Run the Application**:

    -   Start the server:

        ```bash
        cd /server
        npm run dev

    -   Start the client:

        ```bash
        cd /client
        npm run dev

Environment Variables

-   **Backend** (`server/.env`):
    ```
    Account_SID=your_twilio_account_sid
    Auth_Token=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    GOOGLE_API_KEY=your_google_api_key

-   **Frontend** (`client/.env`):
    ```
    `REACT_APP_GOOGLE_API_KEY=your_google_api_key`

Usage
-----

1.  **Login/Sign-Up**: Nurses and patients can log in securely using Firebase Authentication.
2.  **Trigger Emergency Alert**: When an emergency is detected, the system begins locating the nearest nurse.
3.  **Receive Alert**: Nurses receive an SMS alert with options to respond with 'YES' or 'NO'.
4.  **Direct Communication**: If a nurse accepts the alert, a WhatsApp chat link and QR code are generated, enabling direct communication with the patient.

ngrok Setup
-----------

To enable testing of Twilio SMS and other functionalities that require public URLs, you can use **ngrok** to expose your local server to the internet.

1.  **Install ngrok**:

    -   Download ngrok from https://ngrok.com/download.
    -   Unzip the downloaded file and move it to a directory in your PATH, or run it from the unzipped location.
2.  **Start ngrok**:

    -   Open a new terminal window and run:

        ```bash
        ngrok http 5000

    -   This will expose your local server (running on port 5000) to the internet. You will see a public URL like `https://<random_subdomain>.ngrok.io` in the ngrok terminal output.
3.  **Update Twilio Webhook URL**:

    -   Copy the `https://<random_subdomain>.ngrok.io` URL from the ngrok terminal and use it as the webhook URL for Twilio. This way, Twilio will be able to send SMS responses to your local server.
    -   Example webhook URL:
        `https://<random_subdomain>.ngrok.io/sendingNurseResponse`

4.  **Update ngrok URL in Frontend (Optional)**:

    -   If your frontend also needs to connect to this public URL, replace any local `http://localhost:5000` references with the ngrok URL.

> **Note**: Each time you restart ngrok, the public URL will change unless you use a paid ngrok plan with a custom subdomain. Make sure to update the Twilio webhook URL accordingly.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
    
    

    
    

  
  
