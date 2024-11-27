// toggle ham-menu
const hamMenu = document.querySelector('.ham-menu');
const sideNav = document.querySelector('.side-nav');

hamMenu.addEventListener("click",()=>{
    hamMenu.classList.toggle("active");
    sideNav.classList.toggle("active");
})

//full-view imgs-videos options when clicked
function openView(mediaSrc, type) {
    // extract elements
    const fullView = document.getElementById("fullview");
    const fullImage = document.getElementById("fullimage");
    const fullVideo = document.getElementById("fullvideo");
    const downloadLink = document.getElementById("downloadlink");

    if (type === "image") {
        fullImage.src = mediaSrc;
        fullImage.style.display = "block";
        fullVideo.style.display = "none";
        // Set download link for image
        downloadLink.href = mediaSrc; 
        downloadLink.style.display = 'inline-block';
    } else if (type === "video") {
        fullVideo.src = mediaSrc;
        fullVideo.style.display = "block";
        fullImage.style.display = "none";
        // download link available via "controls" attribute for video
    }

    fullView.style.display = "block";
}

function closeView() {
    const fullView = document.getElementById("fullview");
    fullView.style.display = "none";

    // Clear media sources
    document.getElementById("fullimage").src = "";
    document.getElementById("fullvideo").src = "";
}
