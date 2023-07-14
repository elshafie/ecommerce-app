import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "78vh" }}>{children}</main>

      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "E-Commerce App. - shop now",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "MEO Tech",
};

export default Layout;
