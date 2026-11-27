const registerForm = document.getElementById("registerForm"); // select the register form

const message = document.getElementById("message"); // select the message to display if an error occur

// add event listener and send data to the backend api and get response
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent form default page reload

  // form data
  const formData = new FormData(registerForm);

  // send data to the backend
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    // turn the response into json
    const result = await response.json();

    if (!response.ok) {
      message.textContent = result.message || "Registration failed";
    }

    // if registeration successful, redirect to dashboard
    window.location.href = "/dashboard";
  } catch (error) {
    console.error(error);
    message.textContent = "Somthing went wrong, Please try again.";
  }
});
