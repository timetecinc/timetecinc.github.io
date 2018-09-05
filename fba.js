var shipmentID;
var sheetValueTable=[];
function getInfo (){
 $( "#myTableBody" ).empty();
 $( "#mycostTableBody" ).empty();
 $( "#info" ).empty();
 $( "#total" ).empty();
 document.getElementById("mainTable").style.visibility = "visible";
 document.getElementById("costTable").style.visibility = "visible";
 document.getElementById("costTableTitle").style.visibility = "visible";
 document.getElementById("signin-button").style.visibility = "visible";
  var fileInput = document.getElementById('tsv');
 
  var tsvFile = fileInput.files[0];
 
  var fr = new FileReader();
  fr.onload = function(){
     var text = fr.result;
     
    
  //fr.onload = receivedText;
  
  var startSort = false;
  var sku;
  var singleSKU;
  var FNSKU;
  var kitNum;
  var shippedQTY;
  var unitQTY=0;
  var id = "";
  var item;
  var lastSKU = "SKU";
  var nextSKU;
  var lines = text.split('\n');
  var dataTable = [];
  var totalUnitQTY;
  var card = "";
  var reviewCard = "";
  var singlePrice =0;
  var singleWeight = 0;
  var Type = "";
  var totalPrice =0;
  var costTable = []; 
  sheetValueTable=[];
  shipmentID = lines[0].split('\t')[1] + " Shipping Slip";
  console.log("shipmentID " + shipmentID);
  //=========Star decode file===========================================================
  for (var i = 0; i<lines.length -1; i++){
    //get baic info
    if(i<=7){

      $("#info").append(lines[i]+"<br>");
      var temp = [];
      for (var a = 0; a<lines[i].split('\t').length; a++){
        temp.push(lines[i].split('\t')[a].replace(/(\r\n|\n|\r)/gm,""));
      }
      //console.log("table pushed " + lines[i]);
      sheetValueTable.push(temp);
    }else if (i>=9){
    // deal with sorting
    var line = lines[i].split('\t');//split tab
    //get sku

    sku = line[0].split(".")[0];
    //insert SKU
    var nextSKU = ((lines[i+1].split('\t'))[0].split(".")[0]).split("K")[0];
    //console.log("nextSKU" + nextSKU);
    //check Kit number and single sku
    if(sku.indexOf('K')>-1){
    	singleSKU = sku.split("K")[0];
    	kitNum = sku.split("K")[1];
    }else{
    	singleSKU = sku;
    	kitNum = 1;
    }
        //get shipped qty
    shippedQTY = line[9];
    unitQTY += shippedQTY * kitNum;


    //check if is the same item or not
    if (singleSKU != nextSKU){
     // dataTable[i][3] = singleSKU;
     item = singleSKU;
     id = getID(singleSKU);
     
     totalUnitQTY = unitQTY;
     unitQTY = 0;
    }else{
      item = "";
      id = "";
      totalUnitQTY ='';
    }
    FNSKU = line[3];
    if(sku.includes("AP")){
      card = "Apple";
    }else{
      card = "";
    }

    if(kitNum>=2){
      reviewCard = "Review";
    }else{
      reviewCard = "";
    }
    Type = getType(singleSKU,dataBase);
    //console.log(Type);
    singlePrice = getPrice(singleSKU,dataBase);
    singleWeight = getWeight(singleSKU,dataBase);
    dataTable[i] = {SKU:sku,FNSKU: FNSKU, shipped:shippedQTY,Item:item,QTY:totalUnitQTY,ID:id};
    var sheetLine = [];
 

    if(costTable[Type] != null ){
      costTable[Type] = {singlePrice:singlePrice,singleWeight:singleWeight,typeTotalUnitQTY:costTable[Type].typeTotalUnitQTY+(shippedQTY * kitNum) };
    }else{
      costTable[Type] = {singlePrice:singlePrice,singleWeight:singleWeight,typeTotalUnitQTY: shippedQTY * kitNum};
    }
    
    $("#myTableBody").append('<tr><td>'
      +sku+'</td><td>'
      +FNSKU+'</td><td>'
      +shippedQTY+'</td><td>'
      +item+'</td><td>'
      +totalUnitQTY+'</td><td>'
      +id+'</td><td>'
      +card+'</td><td>'
      +reviewCard+'</td></tr>'); 

    sheetLine.push(sku);
    sheetLine.push(FNSKU);
    sheetLine.push(shippedQTY);
    sheetLine.push(item);
    sheetLine.push(totalUnitQTY);
    sheetLine.push(id);
    sheetLine.push(card);
    sheetLine.push(reviewCard);
    sheetValueTable.push(sheetLine);

 }else if(i == 8){
  sheetValueTable.push(["Merchant SKU","FNSKU","Shipped","Item","QTY","ID", "Card", "Review","Name"]);
 }
}
 console.log(dataTable);
 console.log(costTable);
 sheetValueTable.push([""]);
 sheetValueTable.push(["Cost Table"]);
 sheetValueTable.push(["Type","Unit QTY" ,"Single Cost","Single Weight","Toal Cost", "Total Weight"]);
 var totalCost=0;
 var totalWeight=0;
 for (var x in costTable){
 	var costTableLine = [];

    $("#mycostTableBody").append('<tr><td>'
      +x+'</td><td>'
      +costTable[x].typeTotalUnitQTY+'</td><td>'
      +costTable[x].singlePrice+'</td><td>'
      +costTable[x].singleWeight+'</td><td>'
      +(costTable[x].typeTotalUnitQTY * costTable[x].singlePrice).toFixed(2)+'</td><td>'
      +(costTable[x].typeTotalUnitQTY * costTable[x].singleWeight).toFixed(2)+'</td><td>');  
      totalCost += costTable[x].typeTotalUnitQTY * costTable[x].singlePrice;
      totalWeight += costTable[x].typeTotalUnitQTY * costTable[x].singleWeight;
    costTableLine.push(x);
    costTableLine.push(costTable[x].typeTotalUnitQTY);
 	costTableLine.push(costTable[x].singlePrice);
 	costTableLine.push(costTable[x].singleWeight);
 	costTableLine.push((costTable[x].typeTotalUnitQTY * costTable[x].singlePrice).toFixed(2));
 	costTableLine.push((costTable[x].typeTotalUnitQTY * costTable[x].singleWeight).toFixed(2));
 	sheetValueTable.push(costTableLine);
 }
 $("#total").append("Total Cost: " + totalCost.toFixed(2) + "  Total Weight: "+totalWeight.toFixed(2)); 
 //sheetValueTable.push(["Total Cost: ",totalCost.toFixed(2),"  Total Weight: ",totalWeight.toFixed(2)]);


 console.log("sheet Values table done " + sheetValueTable);
 };
 
 fr.readAsText(tsvFile);



return false;



}


function getID(item){
  //console.log("dataBase is [0] Key " + dataBase[item].ID);
  if(dataBase[item]!=null){
    return dataBase[item].ID;
  }else{
    return 'Not Found'; 
  }

}

function getType(item,dataBase){
 
 //var ramDataOBJ = JSON.parse(ramData);

  //return dataBase[item].Type;
    if(dataBase[item]!=null){
    return dataBase[item].Type;
  }else{
    return 'Not Found';
  }
}
function getPrice(item,dataBase){
 //var ramDataOBJ = JSON.parse(ramData);
 //return dataBase[item].CostUSD;
 if(dataBase[item]!=null){
    return dataBase[item].CostUSD;
  }else{
    return 'Not Found';
  }
}
function getWeight(item){
// var ramDataOBJ = JSON.parse(ramData);
 //return dataBase[item].WeightLB;
  if(dataBase[item]!=null){
    return dataBase[item].WeightLB;
  }else{
    return 'Not Found'; 
  }
}
 var CLIENT_ID;
 var API_KEY;
function handleClientLoad() {
  
    var config = firebase.database().ref("config");
      config.once("value").then(function(snapshot) {
      API_KEY = snapshot.val().GoogleAPIKey;
      CLIENT_ID = snapshot.val().GoogleClientId;
      gapi.load('client:auth2', initClient);
      
    });
      
}

function initClient() {
      
      // TODO: Authorize using one of the following scopes:
      //   'https://www.googleapis.com/auth/drive'
      //   'https://www.googleapis.com/auth/drive.file'
      //   'https://www.googleapis.com/auth/spreadsheets'
      var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
}
	var isloggedIn = false;
    function updateSignInStatus(isSignedIn) {
      if (isSignedIn && sheetValueTable.length > 0) {
      	console.log("isSignedIn and table is not empty");
      	isloggedIn = true;
        makeApiCall();
      } else if (isSignedIn && sheetValueTable.length == 0){
      	isloggedIn = true;
      	console.log("update sigin statue = ture and make Api Call");
      }
    }

    function handleSignInClick(event) {
    	if(isloggedIn == false){
      		gapi.auth2.getAuthInstance().signIn();
      		console.log("logged in = false and sign in");
  		}else{
  			console.log("logged in = ture and make Api Call");
  			makeApiCall();
  		}
    }

    function handleSignOutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    function makeApiCall() {
      var spreadsheetBody = {
        // TODO: Add desired properties to the request body.
        properties:{
          title:shipmentID,
        }
      };

      var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log("created sheet ID " + response.result.spreadsheetId);
        var sheetID = response.result.spreadsheetId;
        appendValue(sheetID);

      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
   function appendValue(sheetID) {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: sheetID,  // TODO: Update placeholder value.

        // The A1 notation of a range to search for a logical table of data.
        // Values will be appended after the last row of the table.
        range: 'A:Z',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.

        // How the input data should be inserted.
        insertDataOption: 'OVERWRITE',  // TODO: Update placeholder value.
      };
      console.log("table value is " + sheetValueTable);
      var valueRangeBody = {
        // TODO: Add desired properties to the request body.
        majorDimension: "ROWS",
        values:sheetValueTable

      };

      var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }