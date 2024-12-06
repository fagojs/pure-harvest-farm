document.addEventListener("DOMContentLoaded", () => {
    //NAV BAR
    // toggle ham-menu
    const hamMenu = document.querySelector('.ham-menu');
    const sideNav = document.querySelector('.side-nav');
    
    hamMenu.addEventListener("click",()=>{
        hamMenu.classList.toggle("active");
        sideNav.classList.toggle("active");
    })

    // current page id
    const pageId = document.body.id;

    // HOME PAGE
    if (pageId === "home-page") {
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

    }

    // CONTACT PAGE
    if (pageId === "contact-page") {
        //validate form display error/success message
        document.getElementById("send-message").addEventListener("click",function(){
            let isValid = true;
        
            document.querySelectorAll(".error").forEach(errorField=>{
                errorField.textContent = ""
            })
            // array of id's from form fields
            const formInputFields = ['firstname', 'lastname', 'email', 'contactnumber', 'messagesubject', 'messagebody'];
        
            //email and contactnumber regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const contactPattern = /^[0-9]{10}$/;
        
            formInputFields.forEach(inputField =>{
                const field = document.getElementById(inputField);
                const errorField = document.getElementById(`${inputField}-error`);
                
        
                //if empty fields display message
                if (!field.value.trim()) {
                    errorField.textContent = `${field.placeholder} is required!`;
                    errorField.style.display = "block";
                    isValid = false;
                }else if(inputField === "email" && !emailPattern.test(field.value)){ //check email with regex
                    errorField.textContent = "Please provide correct email format!";
                    errorField.style.display = "block";
                    isValid = false;
                }else if(inputField === "contactnumber" && !contactPattern.test(field.value)){ //check contactnumber with regex
                    errorField.textContent = "Contact number must be 10 digits!";
                    errorField.style.display = "block";
                    isValid = false;
                }
            });
        
            //if fields are not empty and are in correct format 
            const successMessage = document.getElementById("successful");
            if(isValid){
                successMessage.style.display = "block";
                setTimeout(() => {
                  successMessage.style.display = "none";
                  document.getElementById("contact-form").reset();
                }, 3000);
            }
        })
    }

    // PRODUCT PAGE
    if(pageId === "product-page"){
        // add, remove active class
        const productCards = document.querySelectorAll(".product-details");
        productCards.forEach((card) => {
            const svgCloseButton = card.querySelector(".svg-closebtn");
        
            card.addEventListener("click", (e) => {
            e.stopPropagation();
            card.classList.add("active");
            });
        
            svgCloseButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent click from propagating to the card
            card.classList.remove("active");
            });
        });
    }

    //FOOTER SECTION
    // validate subscribe to newsletter form
    document.getElementById('subscribe-button').addEventListener('click', function () {
        const emailInput = document.getElementById('subscribe-email');
        const checkboxInput = document.getElementById('subscribe-checkbox');
        const successMessage = document.getElementById('success-message');
        const failedMessage = document.getElementById('failed-message');
        
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput == "" || !emailPattern.test(emailInput.value) || (!checkboxInput.checked)) {
            failedMessage.style.display = 'block';
            failedMessage.style.backgroundColor = '#e23718'
    
            // Hide message after 3 seconds
            setTimeout(() => {
                failedMessage.style.display = 'none';
            }, 3000);
        }else{
            // Show success message
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = '#087933'
        
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        
            // Reset the form
            document.getElementById('footer-form').reset();
    
        }
    
    });
   
  });






  