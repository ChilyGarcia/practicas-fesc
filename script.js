// Manejo del formulario de inicio de sesión
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
      credentials: "include", // Enviar cookies
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user_id", data.userId);

        if (
          data &&
          data.error == "Correo electrónico o contraseña incorrectos"
        ) {
          console.log("Error: " + data.error);
          // Aquí podrías mostrar un mensaje de error al usuario
        } else {
          // Aquí podrías guardar la información del usuario en el cliente
          console.log("Inicio de sesión exitoso");
          location.href = "dashboard.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Manejo del botón de cerrar sesión
document.getElementById("btnLogOut")?.addEventListener("click", function () {
  console.log("El botón Cerrar sesión ha sido presionado.");

  fetch("http://localhost:8080/api/logOut", {
    method: "GET",
    credentials: "include", // Enviar cookies
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Aquí podrías limpiar la información de sesión en el cliente
      window.location.href = "index.html"; // Redirigir a la página principal
    })
    .catch((error) => console.error("Error:", error));
});

// Manejo del formulario de carga de archivos
document
  .getElementById("uploadForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch("http://localhost:8080/api/magazine", {
      method: "POST",
      body: formData,
      credentials: "include", // Enviar cookies
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
        } else {
          console.error("No se ha proporcionado la URL del PDF");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://localhost:8080/api/user", {
      credentials: "include", // Enviar cookies
    })
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

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("revistaForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("description").value,
        tittle: document.getElementById("tittle").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        category: document.getElementById("category").value,
      };

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfFile");
      var formData = new FormData();
      formData.append("pdfFile", fileInput.files[0]);
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");
      // Solicitud

      fetch("http://localhost:8080/api/magazine/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
});
