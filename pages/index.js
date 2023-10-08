import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { getSortedProductsData } from "../lib/products";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allProductsData = getSortedProductsData();
  return {
    props: {
      allPostsData,
      allProductsData,
    },
  };
}

export default function Home({ allPostsData, allProductsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am a robot 🤖</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Shop</h2>
        <ul className={utilStyles.list}>
          {allProductsData.map(({ id, title, price }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/products/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>${price}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
