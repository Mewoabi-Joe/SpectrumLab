import whatsappbtn from "../assets/icons/WhatsAppButtonGreenSmall.svg"
import axiosInstance from "../utils/axios"
import React from "react"
import { useState } from "react"

const GetInTouch = () => {
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setMessage(message => ({ ...message, [name]: value }))
  }

  const sendMessgae = async e => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post("/messages", message)
      console.log(res)
      window.location.reload(false)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <section
      id="getInTouch"
      className="py-5"
      style={{ backgroundColor: "#ccc" }}
    >
      <div className="container my-lg-5 py-lg-5">
        <h2 className="display-5 text-center text-dark fw-bolder  pb-3 pb-lg-5 ">
          Get in touch
        </h2>
        {/* physical examination */}
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <p
              className="display-6 text-lg-center mb-3"
              style={{ color: "#0AA2C0" }}
            >
              Locate Us
            </p>
            <div className="text-center">
              <iframe
                title="clinic"
                className="w-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7943.145717288415!2d10.418894953906252!3d5.481559600000022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f9bddfa1a7dcb%3A0xeefdbac336d76233!2sMairie%20Rurale%20de%20Bafoussam!5e0!3m2!1sen!2scm!4v1662165719566!5m2!1sen!2scm"
                height="300"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="d-flex justify-content-between mt-2 mb-2">
              <div className="">
                <p>Locate us :</p>
                <p>Phone us :</p>
                <p>Email us :</p>
              </div>
              <div className="">
                <p>Marie rurale, Bafoussam</p>
                <p>+237 677662828</p>
                <p>labtests@spectrumlab.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p
              className="display-6 text-lg-center my-3  mt-5 mt-lg-0"
              style={{ color: "#0AA2C0" }}
            >
              Message Us
            </p>
            <form onSubmit={sendMessgae}>
              <div class="mb-3 ">
                <input
                  name="firstName"
                  type="text"
                  value={message.firstName}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  name="lastName"
                  value={message.lastName}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  name="email"
                  type="email"
                  value={message.email}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  name="phoneNo"
                  value={message.phoneNo}
                  type="tel"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Phone number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <textarea
                  name="message"
                  value={message.message}
                  placeholder="Message"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button className="btn btn-info w-100">Submit</button>
            </form>
          </div>
        </div>
        <p className="mt-5">
          For your convenience we provide different ways of reaching us, you can
          phone us, email us, or if you prefer message us on whatsapp{" "}
          <a aria-label="Chat on WhatsApp" href="https://wa.me/+237670240005">
            {" "}
            <img alt="Chat on WhatsApp" src={whatsappbtn}></img>
          </a>
        </p>
      </div>
    </section>
  )
}

export default GetInTouch
