

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

function readQuote() {
    db.collection("quotes").doc("tuesday")                                                    //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(tuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + tuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
      })
}
readQuote()        //calling the function


function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Chilkoot Trail",    //replace with your own city?
        city: "Alaska",
        province: "Bennet",
        level: "easy",
        length: "10",
        details: "Elmo goes here regularly",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    hikesRef.add({
        code:"AM01",
        name: "Flattop",    //replace with your own city?
        city: "Alaska",
        province: "Anchorage",
        level: "moderate",
        length: "10.5",
        details: "Elmo goes here regularly",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
   });
   hikesRef.add({
        code:"NV01",
        name: "harding-icefield",    //replace with your own city?
        city: "Alaska",
        province: "Seward",
        level: "hard",
        length: "8.2",
        details: "Elmo goes here regularly",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
   });
}
writeHikes()