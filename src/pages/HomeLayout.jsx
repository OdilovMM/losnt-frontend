import { Outlet, useNavigation } from "react-router-dom";
import { Footer, Header } from "../components";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  );
};

export default HomeLayout;
