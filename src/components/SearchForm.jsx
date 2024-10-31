import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchForm";
const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      {/* for par default sans methode post,le submit execute fait un get request donc ajouter les name et value des input et les rajoute a url ou se trouve le component */}
      <Form className="form">
        <input
          type="search"
          name="search"
          className="form-input"
          defaultValue={searchTerm}
        />
        <button
          className="btn btn-block"
          style={{ marginTop: "1rem" }}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "searching...." : "search"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default SearchForm;
