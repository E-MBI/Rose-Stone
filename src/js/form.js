// selectors

const form = document.getElementById("contact_form");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");
const sub_Btn = document.querySelector(" form > button[type='submit']");

function Send_Data() {
  $.ajax({
    method: "POST",
    url: "https://admin.rosestone.net/api/contact-form",
    data: {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    },
    success: function (data, status) {
      // console.log(data);
      // console.log(status);
    },
  });

  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}

sub_Btn.addEventListener("click", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "You Want to Send this Message!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#b3933a",
    cancelButtonColor: "#f099a6",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Done!", "Your Message has been Send.", "success");
    }
  });

  Send_Data();
});
