
function allowDrop(event) {
    event.preventDefault(); 
}
function handleDrop(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        displayAvatar(file);
    } else {
        alert("Lütfen bir görsel dosyası yükleyin.");
    }
}
function handleFileSelect(event) {
    const file = event.target.files[0];
    const maxSize = 500 * 1024;
    if(file.size<=maxSize){
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarBase64 = e.target.result;
            displayAvatar(file);
            localStorage.setItem('avatar', avatarBase64);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Lütfen bir görsel dosyası yükleyin.");
    }
    }
    else{
        alert("File too large, upload a photo under 500 KB");
        event.target.value = "";
        return;
    }
}
function displayAvatar(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarPreview = document.createElement("img");
        avatarPreview.src = e.target.result;
        avatarPreview.style.width = "100%";
        avatarPreview.style.height = "100%";
        avatarPreview.style.borderRadius = "50%";
        const dropzone = document.getElementById("avatar-dropzone");
        dropzone.innerHTML = ''; 
        dropzone.appendChild(avatarPreview);
    };
    reader.readAsDataURL(file);
}
        document.getElementById('submitBtn').addEventListener('click', function() {
        const avatar = localStorage.getItem('avatar');
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const github = document.getElementById('github').value;
        const newPageUrl = `ticket.html?fullname=${encodeURIComponent(fullname)}&email=${encodeURIComponent(email)}&github=${encodeURIComponent(github)}&avatar=${encodeURIComponent(avatar)}`;
        window.location.href = newPageUrl;

});
function generateTicketNumber() {
    let ticketNumber = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i++) {
        ticketNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return ticketNumber;
}

