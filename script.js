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
    ?.addEventListener("submit", function (event) {
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

document.getElementById("btnLogOut")?.addEventListener("click", function () {
  console.log("El botón Cerrar sesión ha sido presionado.");

  fetch("http://localhost:8080/api/logOut", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "index.html";
    })
    .catch((error) => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("uploadForm")
    ?.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(this);

      fetch("http://localhost:8080/api/magazine", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.pdfURL) {
            // Abre el PDF en una nueva ventana del navegador
            window.open(`http://localhost:8080${data.pdfURL}`, "_blank");
          } else {
            console.error("No se ha proporcionado la URL del PDF");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      fetch("http://localhost:8080/api/user")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No has iniciado sesión");
          }
        })
        .then((user) => {
          console.log(user);
          // Aquí puedes hacer lo que quieras con la información del usuario
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});
