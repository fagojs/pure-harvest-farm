document.addEventListener("DOMContentLoaded", () => {
  /*----------------------------NAV BAR----------------------------*/
  const hamMenu = document.querySelector(".ham-menu");
  const sideNav = document.querySelector(".side-nav");

  // create overlay element
  // to dim rest of the page when side-nav is active
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const menuItems = document.querySelectorAll(".navbar .side-nav a");

  //get current page by removing '/' infront of pathname
  const currentPage = window.location.pathname.split("/").pop();
  // console.log(currentPage);

  // add,remove active class of ham-menu, side-nav and overlay
  hamMenu.addEventListener("click", () => {
    const isActive = sideNav.classList.contains("active");

    if (isActive) {
      hamMenu.classList.remove("active");
      sideNav.classList.remove("active");
      overlay.classList.remove("active");
    } else {
      hamMenu.classList.add("active");
      sideNav.classList.add("active");
      overlay.classList.add("active");
    }
  });

  // close side-nav when clicked on overlay
  overlay.addEventListener("click", () => {
    hamMenu.classList.remove("active");
    sideNav.classList.remove("active");
    overlay.classList.remove("active");
  });

  //add,remove active class to selected nav link
  menuItems.forEach((menu) => {
    // console.log(menu.getAttribute("href"))
    if (menu.getAttribute("href") === currentPage) {
      menu.classList.add("active");
    }
  });

  // current page id
  const pageId = document.body.id;

  /*----------------------------HOME PAGE----------------------------*/
  if (pageId === "home-page") {
    //full-view imgs-videos options when clicked
    const imageContent = document.querySelectorAll(".image-group");
    const videoContent = document.querySelectorAll(".video-group");

    imageContent.forEach((img) => {
      img.addEventListener("click", (event) => {
        const mediaSrc = event.target.getAttribute("src");
        openView(mediaSrc, "image");
      });
    });
    videoContent.forEach((vid) => {
      vid.addEventListener("click", (event) => {
        const mediaSrc = event.target.getAttribute("src");
        openView(mediaSrc, "video");
      });
    });

    document.querySelector(".closeview").addEventListener("click", () => {
      closeView();
    });

    //method for viewing media when clicked
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
        downloadLink.style.display = "inline-block";
      } else if (type === "video") {
        fullVideo.src = mediaSrc;
        fullVideo.style.display = "block";
        fullImage.style.display = "none";
        // download link available via "controls" attribute for video
      }

      fullView.style.display = "block";
    }

    //method to close the open media view
    function closeView() {
      const fullView = document.getElementById("fullview");
      fullView.style.display = "none";

      // Clear media sources
      document.getElementById("fullimage").src = "";
      document.getElementById("fullvideo").src = "";
    }
  }

  /*----------------------------ABOUT US PAGE----------------------------*/
  if (pageId === "aboutus-page") {
    const imageContent = document.querySelectorAll(".image-group");

    imageContent.forEach((img) => {
      img.addEventListener("click", (event) => {
        const mediaSrc = event.target.getAttribute("src");
        openView(mediaSrc, "image");
      });
    });
    document.querySelector(".closeview").addEventListener("click", () => {
      closeView();
    });
    function openView(mediaSrc, type) {
      // extract elements
      const fullView = document.getElementById("fullview");
      const fullImage = document.getElementById("fullimage");
      const downloadLink = document.getElementById("downloadlink");

      if (type === "image") {
        fullImage.src = mediaSrc;
        fullImage.style.display = "block";
        // Set download link for image
        downloadLink.href = mediaSrc;
        downloadLink.style.display = "inline-block";
      }

      fullView.style.display = "block";
    }

    //method to close the open media view
    function closeView() {
      const fullView = document.getElementById("fullview");
      fullView.style.display = "none";

      // Clear media sources
      document.getElementById("fullimage").src = "";
    }
  }

  /*----------------------------CONTACT PAGE----------------------------*/
  if (pageId === "contact-page") {
    //validate form display error/success message
    document
      .getElementById("send-message")
      .addEventListener("click", function () {
        let isValid = true;

        document.querySelectorAll(".error").forEach((errorField) => {
          errorField.textContent = "";
        });
        // array of id's from form fields
        const formInputFields = [
          "firstname",
          "lastname",
          "email",
          "contactnumber",
          "messagesubject",
          "messagebody",
        ];

        //email and contactnumber regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactPattern = /^[0-9]{10}$/;

        formInputFields.forEach((inputField) => {
          const field = document.getElementById(inputField);
          const errorField = document.getElementById(`${inputField}-error`);

          //if empty fields display message
          if (!field.value.trim()) {
            errorField.textContent = `${field.placeholder} is required!`;
            errorField.style.display = "block";
            isValid = false;
          } else if (
            inputField === "email" &&
            !emailPattern.test(field.value)
          ) {
            //check email with regex
            errorField.textContent = "Please provide correct email format!";
            errorField.style.display = "block";
            isValid = false;
          } else if (
            inputField === "contactnumber" &&
            !contactPattern.test(field.value)
          ) {
            //check contactnumber with regex
            errorField.textContent = "Contact number must be 10 digits!";
            errorField.style.display = "block";
            isValid = false;
          }
        });

        //if fields are not empty and are in correct format
        const successMessage = document.getElementById("successful");
        if (isValid) {
          successMessage.style.display = "block";
          setTimeout(() => {
            successMessage.style.display = "none";
            document.getElementById("contact-form").reset();
          }, 3000);
        }
      });
  }

  /*----------------------------PRODUCT PAGE----------------------------*/
  if (pageId === "product-page") {
    // add, remove active class
    const productCards = document.querySelectorAll(".product-details");

    // function to remove active class from all product
    const removeActiveClassFromAll = () => {
      productCards.forEach((card) => {
        card.classList.remove("active");
      });
    };

    productCards.forEach((card) => {
      const closeButton = card.querySelector(".close-btn");

      card.addEventListener("click", (e) => {
        // Prevent click from propagating
        e.stopPropagation();
        removeActiveClassFromAll();
        card.classList.add("active");
      });

      closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        // remove outline
        card.blur();
        // remove active class
        removeActiveClassFromAll();
      });
    });
    // remove active class if the user clicks on empty space
    document.addEventListener("click", () => {
      removeActiveClassFromAll();
    });
  }
  /*----------------------------SUSTAINABILITY PAGE----------------------------*/
  if (pageId === "sustain-page") {
    const imageContent = document.querySelectorAll(".image-group");

    imageContent.forEach((img) => {
      img.addEventListener("click", (event) => {
        const mediaSrc = event.target.getAttribute("src");
        openView(mediaSrc, "image");
      });
    });
    document.querySelector(".closeview").addEventListener("click", () => {
      closeView();
    });
    function openView(mediaSrc, type) {
      // extract elements
      const fullView = document.getElementById("fullview");
      const fullImage = document.getElementById("fullimage");
      const downloadLink = document.getElementById("downloadlink");

      if (type === "image") {
        fullImage.src = mediaSrc;
        fullImage.style.display = "block";
        // Set download link for image
        downloadLink.href = mediaSrc;
        downloadLink.style.display = "inline-block";
      }

      fullView.style.display = "block";
    }

    //method to close the open media view
    function closeView() {
      const fullView = document.getElementById("fullview");
      fullView.style.display = "none";

      // Clear media sources
      document.getElementById("fullimage").src = "";
    }
  }

  /*----------------------------PRIVACY PAGE----------------------------*/
  if (pageId === "privacy-page") {
    const infoButtons = document.querySelectorAll(".privacy-container button");

    infoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const content = this.nextElementSibling;

        // toggle the active of the button
        this.classList.toggle("active");

        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
  }

  /*----------------------------FOOTER SECTION----------------------------*/
  // validate subscribe to newsletter form
  document
    .getElementById("subscribe-button")
    .addEventListener("click", function () {
      const emailInput = document.getElementById("subscribe-email");
      const checkboxInput = document.getElementById("subscribe-checkbox");
      const successMessage = document.getElementById("success-message");
      const failedMessage = document.getElementById("failed-message");

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        emailInput == "" ||
        !emailPattern.test(emailInput.value) ||
        !checkboxInput.checked
      ) {
        // Show failed message
        failedMessage.style.display = "block";
        failedMessage.style.backgroundColor = "#e23718";

        // Hide message after 3.5 seconds
        setTimeout(() => {
          failedMessage.style.display = "none";
          // Reset the form
          document.getElementById("footer-form").reset();
        }, 3500);
      } else {
        // Show success message
        successMessage.style.display = "block";
        successMessage.style.backgroundColor = "#087933";

        // Hide success message after 3.5 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
          // Reset the form
          document.getElementById("footer-form").reset();
        }, 3500);
      }
    });
});
