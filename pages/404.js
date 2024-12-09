import Layout from "@/components/Layout";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <Layout metaTitle="Page Not Found">
      <section className="py-28 bg-white text-dark rounded-b-2xl">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="text-center">
                <h1 className="font-medium mb-4 text-black/75">404</h1>
                <p className="text-6xl -ml-4 -mb-2 -rotate-12 text-black/50">Page</p>
                <p className="text-6xl">Not</p>
                <p className="text-6xl -rotate-12 -mt-4 ml-2 text-black/50">Found</p>
                <Link href="/" className="button button-dark mt-12">
                  <span>Back to home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
