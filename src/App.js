import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/Login";
import Browse from "./components/Browse";

const App = () => {

  const appRouter = createBrowserRouter([
      {
          path:"/",
          element:<Body/>,
          children:[
              {

                  path:"/",
                  element:<Login/>,

              },
  
              {
                  path:"/browse",
                  element:<Browse/>
      
              }
          ],
        }
  ])

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
  );
}

export default App;
