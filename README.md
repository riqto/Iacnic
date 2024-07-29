# Project Repository

## Google Sheet
- Location: `/sheets/ReceiptAutomation.xlsx`
- Purpose: Contains data used by the Apps Script.

## Google Form
- Form Link: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfkcJ8zcxkErF39ssgpCXMBO188IHOLRFEi8r7LpQn7gLBrew/viewform?usp=sf_link)
- Purpose: Collects user input that feeds into the Google Sheet.

## Apps Script
- Location: `/receipt-automation-script/`
- Purpose: Contains the Google Apps Script code that interacts with the Google Sheet and the Web App.
- How to deploy: Instructions for deploying the Apps Script.

## Web App
- URL: [Web App](https://script.google.com/macros/s/AKfycbwyQ1OnTqWTaK0NAFQDU1cFihW_WX-vNhmjlE6KCJ4j29pPxUuJnUvbGSRudkSeOyEslg/exec)
- Purpose: Provides an interface for interacting with the data from the Google Sheet.
- Deployment Instructions: How to deploy or update the web app.

## Setup Instructions
1. **Clone the Repository**
   - Clone this repository to your local machine:
     *git clone https://github.com/riqto/Iacnic_AutomatedReceiptGeneration.git*

3. **Navigate to the Project Directory**
   - Change to the directory containing your Apps Script files:
     *cd repository/receipt-automation-script*
   
5. **Install and Authenticate CLASP**
   - CLASP (Command Line Apps Script Projects) is a tool for managing Google Apps Script projects from the command line.
   - Install CLASP globally using npm:
     *npm install -g @google/clasp*
   - Authenticate CLASP with your Google account:
     *clasp login*

6. **Pull and Deploy the Apps Script Files**
   Deploy the Apps Script project to make it executable:
   *clasp pull*
   Deploy the Apps Script project to make it executable:
   *clasp deploy*
   Open the Google Apps Script editor in your browser to make changes or test your script:
   *clasp open*

7. **Import the Google Sheet**
   - Upload the *ReceiptAutomation.xlsx* file to your Google Drive.
   - You can do this by dragging the file into your Google Drive or using the "New" button to upload the file from your local machine.

8. **Link the Google Form to the Google Sheet**
   - Open the Google Form linked to the project.
   - Click on "Responses" and select "Create Spreadsheet."
   - This action creates a new Google Sheet or links to an existing one, allowing data collected from the form to be stored in the Google Sheet.

9. **Configure and Test the Web App**
    - Ensure the Web App URL provided is correctly configured.
    - Test the Web App to ensure it interacts properly with the data in the Google Sheet. You can open the Web App URL in a browser to verify its functionality.

## Contributing
Feel free to contribute to this project by making pull requests. Please ensure to follow the contribution guidelines and maintain the code quality.
