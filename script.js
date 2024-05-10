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

//Formulario revista
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

          var modal = document.getElementById("my_modal_5");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Formulario libro
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("formBook")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Crear un objeto para almacenar los datos del formulario
    var data = {
      description: document.getElementById("descriptionBook").value,
      name: document.getElementById("nameBook").value,
      editorial: document.getElementById("editorial").value,
      isbn: document.getElementById("isbn").value,
    };

    console.log(data);

    // Crear un objeto FormData para el archivo
    var fileInput = document.getElementById("pdf1");
    var fileInput2 = document.getElementById("pdf2");
    var formData = new FormData();
    formData.append("pdf1", fileInput.files[0]);
    formData.append("pdf2", fileInput2.files[0]); // Corregido aquí
    formData.append("json", JSON.stringify(data));

    var id = localStorage.getItem("user_id");
    // Solicitud

    fetch("http://localhost:8080/api/newbook/" + id, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((data) => {
        console.log(data);

        var modal = document.getElementById("mt_modal_6");
        modal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Formulario de capitulo
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formChapter")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionChapter").value,
        name: document.getElementById("nameChapter").value,
        tittle: document.getElementById("tittleChapter").value,
        isbn: document.getElementById("isbnChapter").value,
        editorial: document.getElementById("editorialChapter").value,
      };

      console.log(data);

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdf1Chapter");
      var fileInput2 = document.getElementById("pdf2Chapter");
      var formData = new FormData();
      formData.append("pdf1Chapter", fileInput.files[0]);
      formData.append("pdf2Chapter", fileInput2.files[0]); // Corregido aquí
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");

      fetch("http://localhost:8080/api/newchapter/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_chapter");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Formulario direccion de tesis
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formTesis")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionTesis").value,
        tittle: document.getElementById("tittleTesis").value,
        level: document.getElementById("nivelTesis").value,
        name_author: document.getElementById("nameAutor").value,
        age: document.getElementById("anoTesis").value,
        university: document.getElementById("universidadTesis").value,
      };

      console.log(data);

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfThesisDirection");
      var formData = new FormData();
      formData.append("pdfThesisDirection", fileInput.files[0]);

      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");

      fetch("http://localhost:8080/api/newthesisdirection/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_7");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Formulario de consultoria
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formConsultancy")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionConsultancy").value,
        name_company: document.getElementById("nameCompany").value,
        age: document.getElementById("ageConsultancy").value,
      };

      console.log(data);

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdf1Consultancy");
      var fileInput2 = document.getElementById("pdf2Consultancy");
      var formData = new FormData();
      formData.append("pdf1Consultancy", fileInput.files[0]);
      formData.append("pdf2Consultancy", fileInput2.files[0]); // Corregido aquí
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");

      fetch("http://localhost:8080/api/newconsultancy/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_9");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

//Formulario de ponencia
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formPresentation")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionPresentation").value,
        tittle: document.getElementById("tittlePresentation").value,
        context: document.getElementById("contextPresentation").value,
        name: document.getElementById("namePresentation").value,
      };

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfFilePresentation");
      var formData = new FormData();
      formData.append("pdfFilePresentation", fileInput.files[0]);
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");
      // Solicitud

      fetch("http://localhost:8080/api/newpresentation/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("my_modal_10");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Formulario otros productos
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formOtherProducts")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        name: document.getElementById("nameOtherProduct").value,
      };

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfFileOtherProduct");
      var formData = new FormData();
      formData.append("pdfFileOtherProduct", fileInput.files[0]);
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");
      // Solicitud

      fetch("http://localhost:8080/api/newotherproduct/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_productos");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Formulario del registro de software
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formSoftwareRegistration")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionSoftware").value,
        name: document.getElementById("nameSoftware").value,
        entity: document.getElementById("entitySoftware").value,
        age: document.getElementById("ageSoftware").value,
      };

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfFileSoftwareRegistration");
      var formData = new FormData();
      formData.append("pdfFileSoftwareRegistration", fileInput.files[0]);
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");
      // Solicitud

      fetch("http://localhost:8080/api/newsoftwareregistration/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_productos");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

//Formulario registro de marcas
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("formTrademarkRegistration")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      // Crear un objeto para almacenar los datos del formulario
      var data = {
        description: document.getElementById("descriptionTrademark").value,
        name: document.getElementById("nameTrademark").value,
        age: document.getElementById("ageTrademark").value,
      };

      // Crear un objeto FormData para el archivo
      var fileInput = document.getElementById("pdfFileTrademarkRegistration");
      var formData = new FormData();
      formData.append("pdfFileTrademarkRegistration", fileInput.files[0]);
      formData.append("json", JSON.stringify(data));

      var id = localStorage.getItem("user_id");
      // Solicitud

      fetch("http://localhost:8080/api/newtrademarkregistration/" + id, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((data) => {
          console.log(data);

          var modal = document.getElementById("mt_modal_productos");
          modal.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

document
  .getElementById("closeModalBook")
  ?.addEventListener("click", function () {
    document.getElementById("mt_modal_6").close();
  });

document
  .getElementById("closeModalMagazine")
  ?.addEventListener("click", function () {
    document.getElementById("my_modal_5").close();
  });

document
  .getElementById("closeModalChapter")
  ?.addEventListener("click", function () {
    document.getElementById("mt_modal_chapter").close();
  });
