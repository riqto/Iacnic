function generateMonthlyReport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Receipts');
  var data = sheet.getDataRange().getValues();
  var report = {};
  
  data.forEach(function(row, index) {
    if (index == 0) return; // Skip header row
    
    var date = new Date(row[0]);
    var amount = parseFloat(row[2]);
    var category = row[3];
    
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var key = year + '-' + (month < 10 ? '0' : '') + month;
    
    if (!report[key]) report[key] = {};
    if (!report[key][category]) report[key][category] = 0;
    
    report[key][category] += amount;
  });
  
  // Create or update summary sheet
  var summarySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Summary') || 
                     SpreadsheetApp.getActiveSpreadsheet().insertSheet('Summary');
  summarySheet.clear();
  summarySheet.appendRow(['Month', 'Category', 'Total']);
  
  for (var month in report) {
    for (var category in report[month]) {
      summarySheet.appendRow([month, category, report[month][category]]);
    }
  }
}
