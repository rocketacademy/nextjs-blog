import Head from "next/head";
import Image from "next/image";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllProductIds, getProductData } from "../../lib/products";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const productData = await getProductData(params.id);
  return {
    props: {
      productData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllProductIds();
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
          style={{ width: "100%", height: "auto" }}
        />
        <div className={utilStyles.lightText}>${productData.price}</div>
        <div dangerouslySetInnerHTML={{ __html: productData.contentHtml }} />
      </article>
    </Layout>
  );
}
