// Form to Digital Receipt
function generateFormDigitalReceipt(date, descriptions, amounts, totalAmount, email) {
  Logger.log('Generating digital receipt for email: ' + email);
  
  if (!email) {
    Logger.log('No email provided.');
    return;
  }
  
  // Create a new Google Doc
  var doc = DocumentApp.create('Receipt_' + date);
  var body = doc.getBody();
  
  // Set page margins and background color
  body.setMarginTop(36).setMarginBottom(36).setMarginLeft(36).setMarginRight(36);
  body.setBackgroundColor('#f0f8ff'); // Light blue background

  // Add a header
  var header = body.appendParagraph('RECEIPT');
  header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  header.setFontSize(28);
  header.setFontFamily('Arial');
  header.setBold(true);
  header.setForegroundColor('#003366'); // Dark blue color

  // Add a colored horizontal line
  var coloredLine = body.appendParagraph('_'.repeat(50)); // Repeat underscore 50 times
  coloredLine.setForegroundColor('#003366');
  coloredLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  // Add a table for the receipt details
  var table = body.appendTable();
  
  // Add header row with bold and colored text
  var headerRow = table.appendTableRow();
  var headerCell1 = headerRow.appendTableCell('Detail');
  var headerCell2 = headerRow.appendTableCell('Value');
  
  // Set styles for header cells
  headerCell1.setBackgroundColor('#007bff'); // Blue background
  headerCell2.setBackgroundColor('#007bff'); // Blue background
  headerCell1.setForegroundColor('#ffffff'); // White text
  headerCell2.setForegroundColor('#ffffff'); // White text
  headerCell1.setFontSize(14);
  headerCell2.setFontSize(14);
  headerCell1.setBold(true);
  headerCell2.setBold(true);
  
  // Add receipt details
  var details = [
    ['Date:', date],
    ['Descriptions:', descriptions.join(', ')],
    ['Amounts:', amounts.join(', ')],
    ['Total Amount:', totalAmount.toFixed(2)], // Include total amount
    ['Receipt ID:', 'R-' + Math.random().toString(36).substr(2, 9).toUpperCase()]
  ];
  
  details.forEach(function(detail) {
    var row = table.appendTableRow();
    var cell1 = row.appendTableCell(detail[0]);
    var cell2 = row.appendTableCell(detail[1]);
    
    // Style for detail rows
    cell1.setFontSize(12);
    cell2.setFontSize(12);
    cell1.setBackgroundColor('#f0f0f0'); // Light gray background
    cell2.setBackgroundColor('#ffffff'); // White background
    cell1.setForegroundColor('#000000'); // Black text
    cell2.setForegroundColor('#000000'); // Black text
  });

  // Add a space
  body.appendParagraph(' ');

  // Add a footer with color
  var footer = body.appendParagraph('Thank you for your business!');
  footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  footer.setBold(true);
  footer.setForegroundColor('#003366'); // Dark blue color
  footer.setFontSize(16);

  // Add disclaimer
  var disclaimer = body.appendParagraph('This is a computer-generated receipt and does not require a signature.');
  disclaimer.setFontSize(10);
  disclaimer.setForegroundColor('#666666'); // Gray color
  disclaimer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  disclaimer.setSpacingBefore(20);

  // Save and close the document
  doc.saveAndClose();

  // Get the document as a PDF
  var pdf = doc.getAs('application/pdf');

  // Email the PDF
  try {
    MailApp.sendEmail({
      to: email,
      subject: 'Your Receipt for ' + date,
      body: 'Please find attached your receipt.',
      attachments: [pdf.setName('Receipt_' + date + '.pdf')]
    });
    Logger.log('Receipt emailed to ' + email);
  } catch (error) {
    Logger.log('Failed to send email: ' + error.message);
  }
}

function generateImageDigitalReceipt(date, descriptions, email) {
  Logger.log('Generating digital receipt for email: ' + email);

  if (!email) {
    Logger.log('No email provided.');
    return;
  }

  try {
    // Create a new Google Doc
    var doc = DocumentApp.create('Receipt_' + date);
    var body = doc.getBody();
    
    // Set page margins and background color
    body.setMarginTop(36).setMarginBottom(36).setMarginLeft(36).setMarginRight(36);
    body.setBackgroundColor('#f0f8ff'); // Light blue background

    // Add a header
    var header = body.appendParagraph('RECEIPT');
    header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    header.setFontSize(28);
    header.setFontFamily('Arial');
    header.setBold(true);
    header.setForegroundColor('#003366'); // Dark blue color

    // Add a colored horizontal line
    var coloredLine = body.appendParagraph('_'.repeat(50)); // Repeat underscore 50 times
    coloredLine.setForegroundColor('#003366');
    coloredLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    // Add a table for the receipt details
    var table = body.appendTable();
    
    // Add header row with bold and colored text
    var headerRow = table.appendTableRow();
    var headerCell1 = headerRow.appendTableCell('Detail');
    var headerCell2 = headerRow.appendTableCell('Value');
    
    // Set styles for header cells
    headerCell1.setBackgroundColor('#007bff'); // Blue background
    headerCell2.setBackgroundColor('#007bff'); // Blue background
    headerCell1.setForegroundColor('#ffffff'); // White text
    headerCell2.setForegroundColor('#ffffff'); // White text
    headerCell1.setFontSize(14);
    headerCell2.setFontSize(14);
    headerCell1.setBold(true);
    headerCell2.setBold(true);
    
    // Add receipt details
    var details = [
      ['Date:', date],
      ['Receipt ID:', 'R-' + Math.random().toString(36).substr(2, 9).toUpperCase()],
      ['Description:', descriptions || 'No description'] // Add description row
    ];
    
    details.forEach(function(detail) {
      var row = table.appendTableRow();
      var cell1 = row.appendTableCell(detail[0]);
      var cell2 = row.appendTableCell(detail[1]);
      
      // Style for detail rows
      cell1.setFontSize(12);
      cell2.setFontSize(12);
      cell1.setBackgroundColor('#f0f0f0'); // Light gray background
      cell2.setBackgroundColor('#ffffff'); // White background
      cell1.setForegroundColor('#000000'); // Black text
      cell2.setForegroundColor('#000000'); // Black text
    });

    // Add a space
    body.appendParagraph(' ');

    // Add a footer with color
    var footer = body.appendParagraph('Thank you for your business!');
    footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footer.setBold(true);
    footer.setForegroundColor('#003366'); // Dark blue color
    footer.setFontSize(16);

    // Add disclaimer
    var disclaimer = body.appendParagraph('This is a computer-generated receipt and does not require a signature.');
    disclaimer.setFontSize(10);
    disclaimer.setForegroundColor('#666666'); // Gray color
    disclaimer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    disclaimer.setSpacingBefore(20);

    // Save and close the document
    doc.saveAndClose();

    // Get the document as a PDF
    var pdf = doc.getAs('application/pdf');

    // Send the email
    try {
      MailApp.sendEmail({
        to: email,
        subject: 'Your Receipt for ' + date,
        body: 'Please find attached your receipt.',
        attachments: [pdf.setName('Receipt_' + date + '.pdf')]
      });
      Logger.log('Receipt emailed to ' + email);
    } catch (error) {
      Logger.log('Failed to send email: ' + error.message);
    }
  } catch (error) {
    Logger.log('Error generating receipt: ' + error.message);
  }
}

