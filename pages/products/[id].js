import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const product = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const productData = await product.json();
  return {
    props: {
      productData,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  // We must return paths in this specific format
  const paths = products.map((product) => {
    return {
      params: {
        id: product.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default function Product({ productData }) {
  return (
    <Layout>
      <Head>
        <title>{productData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{productData.title}</h1>
        <Image
          src={productData.image}
          width={500}
          height={500}
          alt={productData.title}
          style={{ width: "auto", height: "500px" }}
        />
        <br />
        <div className={utilStyles.lightText}>${productData.price}</div>
        <div dangerouslySetInnerHTML={{ __html: productData.description }} />
      </article>
    </Layout>
  );
}
