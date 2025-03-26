const navSlide = () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
  
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active")
  
      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
  
      // Burger Animation
      burger.classList.toggle("toggle")
    })
  }
  
  const handleContactForm = () => {
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = form.elements["name"].value
      const email = form.elements["email"].value
      const message = form.elements["message"].value
  
      // Here you would typically send this data to a server
      console.log("Form submitted:", { name, email, message })
      alert("Thank you for your message! We will get back to you soon.")
      form.reset()
    })
  }
  
  navSlide()
  handleContactForm()
  
  