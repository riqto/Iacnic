function addReceipt(date, descriptions, amounts, category, email, imageData) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var recSheet = spreadsheet.getSheetByName('Receipts');
  var extractedDataSheet = spreadsheet.getSheetByName('Extracted OCR Data');

  if (!recSheet || !extractedDataSheet) {
    Logger.log('One or more of the sheets not found.');
    return { success: false, message: 'Error processing the request.' };
  }

  var totalAmount = 0;
  var extractedData = null;

  // Ensure descriptions is an array
  descriptions = Array.isArray(descriptions) ? descriptions : [];

  if (imageData) {
    try {
      var base64Data = imageData.split(',')[1];
      var decodedBytes = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decodedBytes, 'image/jpeg', 'receipt.jpg');

      var file = DriveApp.createFile(blob);
      var fileId = file.getId();

      Logger.log('Uploaded file ID: ' + fileId);

      extractedData = CloudVisionAPI(fileId);
      Logger.log('OCR Result: ' + extractedData);

      var currentDate = formatDate(new Date());

      descriptions = ["From Receipt Image"];
      amounts = [0];

      totalAmount = amounts.reduce((sum, amt) => sum + (parseFloat(amt) || 0), 0);

      if (isOCRDataRedundant(extractedDataSheet, extractedData)) {
        Logger.log('Duplicate OCR data found. Not adding the receipt.');
        return { success: false, message: 'Duplicate OCR data. Cannot submit.' };
      }

      extractedDataSheet.appendRow([currentDate, extractedData]);

      recSheet.appendRow([currentDate, descriptions.join(', '), totalAmount, "General", totalAmount]);
      Logger.log('Receipt data added to Receipts sheet.');
      
      if (email) {
        generateImageDigitalReceipt(currentDate, extractedData, email);
      }

      return { success: true, message: 'Receipt submitted successfully.' };
    } catch (error) {
      Logger.log("Error processing image: " + error.message);
      return { success: false, message: 'Error processing image.' };
    }
  } else {
    var receiptDate = formatDate(new Date(date));

    var receiptAmounts = Array.isArray(amounts) ? amounts.map(a => parseFloat(a) || 0) : [];

    if (isNaN(receiptAmounts.reduce((a, b) => a + b, 0)) || receiptDate === 'Invalid Date') {
      Logger.log('Invalid date or amount. Skipping receipt.');
      return { success: false, message: 'Invalid date or amount.' };
    }

    totalAmount = receiptAmounts.reduce((sum, amt) => sum + amt, 0);

    if (isFormReceiptRedundant(recSheet, receiptDate, descriptions.join(', '), totalAmount, category)) {
      Logger.log('Duplicate receipt found. Not adding the receipt.');
      return { success: false, message: 'Duplicate receipt data. Cannot submit.' };
    }

    recSheet.appendRow([receiptDate, descriptions.join(', '), totalAmount, category || "General", totalAmount]);
    Logger.log('Receipt data added to Receipts sheet.');

    if (email) {
      generateFormDigitalReceipt(receiptDate, descriptions, receiptAmounts, totalAmount, email);
    }

    return { success: true, message: 'Receipt submitted successfully.' };
  }
}

function onFormSubmit(e) {
  try {
    var responses = e.values;
    var email = String(responses[5]); // Assuming email is the first field after the timestamp
    var date = responses[1]; // Assuming date is the second field
    var descriptions = responses[2].split(','); // Assuming descriptions are provided as a comma-separated string
    var amounts = responses[3].split(','); // Assuming amounts are provided as a comma-separated string
    var category = responses[4]; // Assuming category is the last field

    // Ensure the descriptions and amounts arrays are of the same length
    if (descriptions.length !== amounts.length) {
      throw new Error("Descriptions and amounts arrays are not of the same length.");
    }

    // Convert amounts to numbers
    amounts = amounts.map(function(amount) {
      return parseFloat(amount.trim());
    });

    // Log the received data for debugging purposes
    Logger.log("Email: " + email);
    Logger.log("Date: " + date);
    Logger.log("Descriptions: " + JSON.stringify(descriptions));
    Logger.log("Amounts: " + JSON.stringify(amounts));
    Logger.log("Category: " + category);

    // Call the addReceipt function to process the data
    addReceipt(date, descriptions, amounts, category, email, null); // Assuming imageData is not provided

  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}


// Check Duplicate Form Data
function isFormReceiptRedundant(recSheet, date, description, amount, category) {
  var data = recSheet.getDataRange().getValues();
  var inputDate = new Date(date).toDateString();
  var inputAmount = parseFloat(amount);
  var inputCategory = category.trim();

  if (isNaN(inputAmount)) {
    Logger.log('Invalid amount: ' + amount);
    return false;
  }

  Logger.log('Checking for redundancy with Date: ' + inputDate + ', Description: ' + description + ', Amount: ' + inputAmount + ', Category: ' + inputCategory);

  for (var i = 1; i < data.length; i++) {
    var rowDate = new Date(data[i][0]).toDateString();
    var rowDescription = (data[i][1] || '').toString().trim();
    var rowAmount = parseFloat(data[i][2]);
    var rowCategory = (data[i][3] || '').toString().trim();

    if (isNaN(rowAmount)) {
      Logger.log('Invalid amount in row ' + i + ': ' + data[i][2]);
      continue;
    }

    if (rowDate === inputDate && 
        rowDescription === description.trim() && 
        rowAmount === inputAmount &&
        rowCategory === inputCategory) {
      Logger.log('Redundant receipt found: ' + [date, description, amount, category].join(', '));
      return true;
    }
  }

  Logger.log('No redundancy found for: ' + [date, description, amount, category].join(', '));
  return false;
}

// Check Duplicate Image Data
function isOCRDataRedundant(extractedDataSheet, extractedData) {
  var data = extractedDataSheet.getDataRange().getValues();

  Logger.log('Checking for OCR data redundancy with extracted data: ' + extractedData);

  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === extractedData) {
      return true;
    }
  }
  return false;
}


// Date Format (YYYY-MM-DD)
function formatDate(date) {
  var d = new Date(date);
  var year = d.getFullYear();
  var month = ('0' + (d.getMonth() + 1)).slice(-2); // Months are zero-based
  var day = ('0' + d.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

// Deploy Web App
function doGet() {
  return HtmlService.createHtmlOutputFromFile('ReceiptCreation');
}
