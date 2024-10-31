import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cocktail,
  Landing,
  Newsletter,
  Error,
  HomeLayout,
  SinglePageError,
} from "./assets/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as ladingLoader } from "./assets/pages/Landing";
import { loader as singleCocktail } from "./assets/pages/Cocktail";
import { action as formAction } from "./assets/pages/Newsletter";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Les données restent fraîches pendant 5 minutes par défaut
      cacheTime: 10 * 60 * 1000, // Les données restent dans le cache pendant 10 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    //toujours commencer avec / , petern
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    //error sert a renvoyer l utilisateur vers not found lorsque urel n exisre pas

    children: [
      {
        //index sert a dire / sera le path par defaut du honmloaoutß
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: ladingLoader(queryClient),
      },
      {
        //1- le lient arrive ici grace router dome
        path: "cocktail/:id",
        //3- une fois loader a chargé les doonnées element se lancer alonance le component cocktailer pour afficher les data useloader
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        //2- le code va executer le fonction loader qui se trouve dans le meme fichier component attention pas le component
        loader: singleCocktail(queryClient),
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: formAction,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },

  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

//je creer les pages jsx
//je crais les imports
//je creer dans la page app.jsx le warapper RouterProvier
// je creer dans dans la meme page app.jsx le router creatoueRouter([{path,}])
//je ceer dans une page jsx parent homelayout ou sharedlaoyut pour quuele ne change pas mais unique,et les element a linterieur pour laisser navnar et footer sa changer
//donc dans cette pas jsx je met <outel/>
//et dans app main,children:[{}]
//je fais le react useContext avec priver pour circulation de data entre compometm enfat et parent dans appcontex qui est export puis va rapper le main
//je peux utiliser dans cetain cas react query
//dans cet exemple je vais utiliser react loader donc dansle component je souhaite fetcher la data, meme avamt le chaegemement de render du component
//le loder va se lancer pour fetch data avant le render et return une vakeur
//donc loader va etre exporter depuis la page d compomet en dehors de la fonction du component a linteireur il yaura le fetch
//cette fonction doit avvoir imperatif un return
//dans app.jsx je dois ajouter loader  dals le component ou il a été fetché, mais il ya un seul alias loader , donc donner un alias pour chque compomemt et ajouter comme valeur a la clé loader
// puis grace a ce le loader va etre diponible a l'interieur du component avec le hook useloaderdata au lieu d etre a lixterieur
// doncavant la chargenetn du premier render du component la data sera dispoible
