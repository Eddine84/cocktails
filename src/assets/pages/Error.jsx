import Wrapper from "../wrappers/ErrorPage";

import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/not-found.svg";
//useRouteError sert a donner la nature de l'erreur !
const Error = () => {
  const error = useRouteError();
  //sert a capter le type dereur commit et afficher le message selon le erreur cest un hook par defaut sur react

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h2>ohh!</h2>
          <p>We can't seem to find the page that your are looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong!</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
