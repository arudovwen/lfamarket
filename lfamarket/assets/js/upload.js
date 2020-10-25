function handleFileChange(event) {
  var file = event.target.files[0];
 
   this.processUpload(file);
}

function processUpload(file) {
  var progress = document.getElementById('progress');
  var currentValue = document.getElementById('currentValue');
  var name = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  var apiKey ="299876354696117"
  var cloudName="dpe85nxdh";
  var uploadPreset="polybuckz";

  var formData = new FormData();
  var xhr = new XMLHttpRequest();
  var cloudName = cloudName;
  var upload_preset = uploadPreset;
  formData.append("file", file);
  formData.append("resource_type", "auto");
  formData.append("upload_preset", upload_preset); // REQUIRED
  xhr.open("POST", "https://api.cloudinary.com/v1_1/" + cloudName + "/upload");
  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      progress.style.width = `${Math.round((e.loaded / e.total) * 100)}%`;
    
      console.log("xhr.upload.onprogress -> progress", progress)
    }
  };
  xhr.upload.onloadstart = function (e) {
    currentValue.innerHTML = "Uploading...";
  };
  xhr.upload.onloadend = function (e) {
    currentValue.innerHTML  = "Completing..";
  };
  xhr.onload = (progressEvent) => {
    if (xhr.status === 200) {
      // Success! You probably want to save the URL somewhere
      currentValue.innerHTML  = "Completed";
      console.log("xhr.onload -> currentValue", currentValue)

      var response = JSON.parse(xhr.response);
      document.getElementById('url').innerHTML= response.secure_url; // https address of uploaded file
    } else {
      progress = 0;
      alert("Upload failed. Please try again.");
    }
  };
  xhr.send(formData);
 
}


