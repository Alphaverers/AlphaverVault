// Here it is, the (mostly) original unobfuscated code.
// This originally ran off PHP.
console.log({
        "lilypad": {
        "name": "lilypad_qa_client",
        "format": "jar",
        "MD5": "d04a76baaa6784ceaa46649cdaf04af5"
        },
        "preview": {
            "name": "v1605_preview_client",
            "format": "jar",
            "MD5": "aaa0dd3a38f25a848bd4a5ec176f6fd9"
        },
        "unrpreview_server": {
            "name": "v1605_unrpreview2_server",
            "format": "jar",
            "MD5": "0fb9d7998bcc269f521cd66c85df366d"
        },
        "unrpreview_client": {
            "name": "v1605_unrpreview2_client",
            "format": "jar",
            "MD5": "b9ae07baff30118ffeb7b53d536e3114"
        },
        "btr": {
            "name": "btr",
            "format": "zip",
            "MD5": "9f00881ee67e7ca117aa9a00cd651faa"
        },
        "btr2": {
            "name": "btr2",
            "format": "zip",
            "MD5": "a789a596210dac5f1f8b38d922c82aa9"
        },
        "btr3": {
            "name": "btr3",
            "format": "zip",
            "MD5": "e1a307fd289f1ccc26a28aa33ba4be8b"
        },
        "btr4": {
            "name": "btr4",
            "format": "zip",
            "MD5": "bac38acc65f6523801265c608eff001f"
        },
        "Haiza": {
            "name": "HZDScript",
            "format": "ttf",
            "MD5": "07291609e1a12842a0012ddf5290fb9e"
        },
        "Soundtrack": {
            "name": "Soundtracks-OST1&2",
            "format": "rar",
            "MD5": "NONE"
        }
})

let EndBytes = [39, 86, 26, 72, 13, 91, 23];

function GenerateKeyForName(name){
    
    var ret = "";
    name = name.toUpperCase();
    var nameRecalc = name;
    
    if (name.length >= 15){
        console.log("Name too long");
        return "#";
    }
    for (var i = 0; i < name.length; i++){
        var a = name.charAt(i);
        if ((a < 'A' || a > 'Z') && a != "_" && (a < '0' || a > '9')){
            console.log("Invalid character, use only A to Z uppercase");
            return "#";
        }
    }
    
    var encName = "";
    var writtenBytes = 0;
    for (var i = 0; i < name.length; i++){
        encName += (70 - (26 - (name.charCodeAt(i) - 'A'.charCodeAt(0)))).toString();
        writtenBytes++;
    }
    encName += (EndBytes[Math.floor(Math.random() * EndBytes.length)]).toString();
    writtenBytes++;
    console.log("Encoded name as: " + encName);
    
    var fullNameStr = encName;
    
    while (writtenBytes != 15){
        fullNameStr += (10+Math.floor(Math.random() * 89)).toString();
        writtenBytes++;
    }
    
    var checksumFullName = 0;
    for (var i = 0; i < fullNameStr.length; i++){
        checksumFullName += (fullNameStr.charCodeAt(i) - '0'.charCodeAt(0));
    }
    var checksumName = 0;
    for (var i = 0; i < encName.length; i++){
        checksumName += (encName.charCodeAt(i) - '0'.charCodeAt(0));
    }
    checksumName %= 100;
    
    console.log("checksum of full name: " + checksumFullName);
    var checkSumPart1 = checksumFullName + Math.floor(Math.random() * (999-checksumFullName));
    var checkSumPart2 = checkSumPart1 - checksumFullName;
    
    var retStr = "";
    retStr += ('000'+checkSumPart1).slice(-3);
    retStr = retStr.split("").reverse().join("");
    retStr += fullNameStr;
    retStr += ('000'+checkSumPart2).slice(-3);
    retStr += ('00'+checksumName).slice(-2);

    retStr = retStr.slice(0, 6) + "-" + retStr.slice(6);
    retStr = retStr.slice(0, 15) + "-" + retStr.slice(15);
    retStr = retStr.slice(0, 23) + "-" + retStr.slice(23);
    retStr = retStr.slice(0, 31) + "-" + retStr.slice(31);
    retStr = retStr.slice(0, 36) + "-" + retStr.slice(36);

    return retStr;
}

function genKeyAfterTime(){

    document.getElementById("key").innerHTML = "Please wait...";
    setTimeout(function(){
        generateKey();
    }, 1000)
}

function generateKey(){
    var name = document.getElementById("name").value;
    if (name == ""){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * name cannot be empty";
        return;
    }
    var key = GenerateKeyForName(name);
    if (name.startsWith("dev")){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * this username format is reserved for internal use";
    } 
    else if (name.length >= 15){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * username too long";
    }
    else if (key == "#"){
        document.getElementById("key").innerHTML = "Errors occurred during key generation:<br> * invalid character in username";
    }
    else {
        document.getElementById("key").innerHTML = "Success! Your key is: <br>" + key + "<br>Copied to clipboard.";
				navigator.clipboard.writeText(key);
    }
}