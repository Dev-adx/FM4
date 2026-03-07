// Google Apps Script - Updated with UTM Parameters
// Add these new columns to your Google Sheet headers:
// Date, Name, Age, City, Email, Phone, Profession, Txnid, Amount, Source, utm_source, utm_medium, utm_campaign, utm_term, utm_content

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.age || "",
    data.city || "",
    data.email || "",
    data.phone || "",
    data.profession || "",
    data.txnid || "",
    data.amount || "",
    data.source || "direct",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_term || "",
    data.utm_content || ""
  ]);

  return ContentService.createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}

