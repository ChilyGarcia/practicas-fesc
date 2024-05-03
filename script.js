document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    var formObject = {};
    formData.forEach(function (value, key) {
      formObject[key] = value;
    });

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(this);

      var formObject = {};
      formData.forEach(function (value, key) {
        formObject[key] = value;
      });

      fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error == "Correo electrónico o contraseña incorrectos") {
            console.log("Error: " + data.error);

            document.getElementById("errorDiv").style.display = "block";

            // Después de 2 segundos, oculta el div de error
            setTimeout(() => {
              document.getElementById("errorDiv").style.display = "none";
            }, 2000);
          } else {
            window.location.href = "dashboard.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});
