function CloudVisionAPI(fileId) {
  var apiKey = '';
  var image = DriveApp.getFileById(fileId).getBlob();
  
  try {
    var response = UrlFetchApp.fetch("https://vision.googleapis.com/v1/images:annotate?key=" + apiKey, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify({
        "requests": [
          {
            "image": {
              "content": Utilities.base64Encode(image.getBytes())
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      })
    });
    
    var result = JSON.parse(response.getContentText());
    if (result.responses && result.responses[0] && result.responses[0].fullTextAnnotation) {
      var text = result.responses[0].fullTextAnnotation.text;
      return text;
    } else {
      Logger.log("No text found in the image.");
      return null;
    }
  } catch (error) {
    Logger.log("Error calling Cloud Vision API: " + error.message);
    return null;
  }
}
