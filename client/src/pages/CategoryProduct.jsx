import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";

const CategoryList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  const params = useParams();

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params?.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  return (
    <Layout title={"Category Product"}>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>

        <div className="d-flex flex-wrap">
          {products.map((product) => (
            <div
              key={product._id}
              className="card m-2"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                style={{ height: "60%" }}
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description.substring(0, 30)}
                </p>
                <p className="card-text"> $ {product.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
