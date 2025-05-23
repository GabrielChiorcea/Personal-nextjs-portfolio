import menu from "@/config/menus.json";
import siteConfig from "@/config/site.config.json";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import style from "@/styles/modules/Footer.module.scss";

const Footer = () => {
  const { copyright, socialLinks } = siteConfig;
  const { footerMenu } = menu;

  // get the page slug from the url
  const slug = useRouter().asPath;
  const [contactPage, setContactPage] = useState(false);
  useEffect(() => {
    slug.includes("contact") && setContactPage(true);
  }, [slug]);

  return (
    <footer className={`${contactPage ? "pt-24" : "pt-28"} pb-20 sticky bottom-0 z-[1]`}>
      {!contactPage && (
        <div className="mb-16 overflow-hidden">
          <Link
            href="/contact"
            className={`${style["footer-cta"]} block text-5xl font-secondary font-medium mb-8`}
          >
            <div className={`${style["animated-line"]} ${style["animated-line-one"]} mb-5`}>
              <div className={style["line-block"]}>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
              </div>
              <div className={style["line-block-copy"]}>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
              </div>
            </div>

            <div className={`${style["animated-line"]} ${style["animated-line-two"]}`}>
              <div className={style["line-block"]}>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
              </div>
              <div className={style["line-block-copy"]}>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
                <span className="mr-24">
                  <span className={style["cta-text"]}>Let’s get in touch</span>
                  <Image
                    className={`inline-block ml-16 ${style["cta-icon"]}`}
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="md:col-6 text-center md:text-left mb-4">
            <ul className="inline-flex flex-wrap justify-center md:justify-start gap-x-6">
              {socialLinks.map((item, key) => (
                <li key={key} className="inline-block hover:opacity-75 transition-op duration-300">
                  <a href={item.link} className="link">{item.fullName}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-6 text-center md:text-right mb-4">
            <ul className="inline-flex flex-wrap justify-center md:justify-end gap-x-6">
              {footerMenu.map((item, key) => (
                <li key={key} className="inline-block hover:opacity-75 transition-op duration-300">
                  <a href={item.link} className="link">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-6 text-center md:text-left mb-4 md:mb-0">
            <p className="text-white/75">{copyright}</p>
          </div>
          <div className="md:col-6 text-center md:text-right">
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;