import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  // request.formData().then((data)=>{
  //   console.log(data);
  // })

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    //donc formData est une class formData { field1="valeur", field2="valuer2"} donc ca devient {field1:"valeur",field2:"valuer2"}
    const response = await axios.post(newsletterUrl, data);

    toast.success("succesfull");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }

  //contrairement a <navigate/> qui est utilisé dans le component , redirect est utilisé dans action ou loader seulement avant rendu di component
};

const Newsletter = () => {
  //01 quand  je click sur button submit dans il ya un post qui fait , donc rediriger vers le route actuel localhost/newsleteer?etc
  //02-la methode action est executé donc formaction
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our news letter
      </h4>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          id="name"
          type="text"
          className="form-input"
          name="name"
          defaultValue="djamel eddine"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="firstName" className="form-label">
          last name
        </label>
        <input
          id="lastName"
          type="text"
          className="form-input"
          name="lastName"
          defaultValue="fersadou"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          name="email"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting" : "submit"}
      </button>
    </Form>
  );
};
export default Newsletter;
