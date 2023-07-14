import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial product detail
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.product);

      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top"
            src={
              product?._id && `/api/v1/product/product-photo/${product?._id}`
            }
            alt={product.name}
            height={"300"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: {product?.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Shipping: {product?.Shipping ? "Yes" : "No"}</h6>
          <button className="btn btn-secondary ms-1">Add to Cart</button>
        </div>
      </div>

      <hr />

      <div className="row container">
        <h6>Similar products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts.map((product) => (
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

                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
