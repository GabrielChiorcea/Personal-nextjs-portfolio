import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react';

import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const About = ({ aboutPage }) => {
  const { title, subtitle, about, featuredBy, services, whatClientsSay } = aboutPage.frontMatter;

  // Random Numbers
  const [randomNumbers, setRandomNumbers] = useState([]);
  useEffect(() => {
    const generateUniqueRandomNumbers = () => {
      const numbers = [];
      const min = -6;
      const max = 6;
      while (numbers.length < about.images.length) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      setRandomNumbers(numbers);
    };
    generateUniqueRandomNumbers();
  }, [about.images]);


  // Swap Images
  const imageRef = useRef(null);
  const imageIndexRef = useRef(0);

  const swapImages = () => {
    const { children } = imageRef.current;
    const lastIndex = children.length - 1;
    const previousIndex = imageIndexRef.current;
    console.log(lastIndex, previousIndex)

    const nextIndex = previousIndex === 0 ? lastIndex : previousIndex - 1;

    for (let i = 0; i < children.length; i++) {
      children[i].style.zIndex = i === nextIndex ? 99 : 0;
    }

    imageIndexRef.current = nextIndex;
  };

  // Rotate Icon & Swap Images
  const [rotate, setRotate] = useState(0);
  const handleClick = () => {
    setRotate(rotate + 360);
    swapImages();
  };

  return (
    <Layout metaTitle={title}>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="py-28 bg-white text-dark">
        <div className="container">
          <div className="row justify-center items-center">
            <div
              className="lg:col-4 md:col-6 col-10 mb-16 lg:mb-0"
              data-aos="fade-up-sm"
            >
              <div
                ref={imageRef}
                onClick={() => handleClick()}
                className="relative mx-8 z-10 cursor-pointer hover:scale-105 transition-transform ease-out duration-300"
              >
                {about.images.map((item, index) => (
                  <div
                    key={index}
                    className={`transition-transform ${index !== 0 ? `absolute top-0 left-0` : "relative"}`}
                    style={{ zIndex: -index, transform: `rotate(${randomNumbers[index]}deg)` }}
                  >
                    <Image
                      src={item}
                      alt="Image"
                      width={500}
                      height={607}
                      className="rounded-lg bg-light/10"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="lg:col-5 md:col-10 text-center lg:text-left"
              data-aos="fade-up-sm"
              data-aos-delay="100"
            >
              <div className="pl-0 lg:pl-8 flex flex-col">
                <div className="order-2 lg:order-1 mb-0 lg:mb-10 mt-10 lg:mt-0">
                  <p className="text-2xl leading-snug mb-4">{about.title}</p>
                  <div className="text-black/75">
                    <Markdown content={about.description} inline={true} />
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <button className="button button-sm button-dark" onClick={() => handleClick()}>
                    <span>
                      <svg
                        style={{ transform: `rotate(${rotate}deg)` }}
                        className="inline align-bottom mr-2 transition-transform ease-out duration-1000"
                        width="16" height="16" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3332 10.0003C18.3332 14.6027 14.6022 18.3337 9.99984 18.3337C5.39746 18.3337 2.49984 13.7503 2.49984 13.7503M1.6665 10.0003C1.6665 5.39795 5.37021 1.66699 9.99984 1.66699C15.5554 1.66699 18.3332 6.25033 18.3332 6.25033M18.3332 6.25033V3.33366M18.3332 6.25033H15.4165M2.49984 13.7503H5.4165M2.49984 13.7503V16.667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      More Photos
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredBy.enable && (
        <section className="pb-24 pt-10 bg-white text-dark overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-10">
                <h2
                  className="text-3xl font-secondary font-medium text-center"
                  data-aos="fade"
                >
                  {featuredBy.title}
                </h2>
              </div>
              <div className="col-12">
                <div className="flex justify-center items-center flex-wrap">
                  {featuredBy.brands.map((item, index) => (
                    <div
                      key={index}
                      className="mx-8 my-4"
                      data-aos="fade-left"
                      data-aos-delay={index * 50}
                    >
                      <Image
                        src={item}
                        alt="Brand"
                        width={120}
                        height={80}
                        className="w-auto max-h-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {services.enable && (
        <section className="py-28">
          <div className="container">
            <div className="row mb-16 items-end">
              <div className="sm:col-8 order-2 sm:order-1">
                <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px] text-center sm:text-left">
                  {services.title}
                </h2>
              </div>
              <div className="sm:col-4 order-1 sm:order-2 block mb-4 sm:mb-0 text-center sm:text-right">
                <span className="font-secondary text-2xl leading-none text-white/75">
                  {services.subtitle}
                </span>
              </div>
            </div>

            <div className="row g-0">
              {services.serviceLists.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`lg:col-4 md:col-6`} data-aos="fade-in">
                    <div className={`${item.active ? "" : "select-none cursor-not-allowed hover:border-white/5"} border border-white/5 hover:border-white/40 p-8 h-full rounded-lg`}>
                      <span className="text-lg font-secondary font-medium text-white/75">
                        / {index < 9 ? "0" + (index + 1) : (index + 1)}
                      </span>
                      <h3 className={`my-6 text-3xl ${item.active ? "" : "text-white/75"}`}>{item.title}</h3>
                      <div className="text-white/75 text-lg">
                        <Markdown content={item.description} inline={true} />
                      </div>
                    </div>
                  </div>
                  {index !== services.serviceLists.length - 1 && services.rotatingIcon && (
                    <div className={`lg:col-4 md:col-6 block md:hidden lg:block`}>
                      <div className="p-8 h-full flex items-center content-center py-6">
                        <svg className="mx-auto opacity-10 animate-spin h-10 w-10 md:h-16 md:w-16" style={{ animationDuration: "6000ms" }} xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 23 23" fill="none"><path d="M23 12.9234H14.9568L20.6503 18.6169L18.6169 20.6051L12.9234 14.9116V23L10.0766 22.9548V14.9116L4.3831 20.6503L2.39489 18.6169L8.08841 12.9234H0V10.0766H8.08841L2.39489 4.33792L4.3831 2.3497L10.0766 8.08841V0H12.9234V8.08841L18.6621 2.3497L20.6503 4.33792L14.9568 10.0766H23V12.9234Z" fill="white" /></svg>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <section className="py-28 bg-white text-dark rounded-b-2xl" data-aos="fade-in">
        <div className="container">
          <div className="row mb-16 items-end">
            <div className="col-12 text-center">
              <span className="font-secondary block text-2xl leading-none text-black/75 mb-4">
                {whatClientsSay.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-secondary font-medium -mt-[6px]">
                {whatClientsSay.title}
              </h2>
            </div>
          </div>
          <div className="row justify-center">
            <div className="lg:col-8">
              <div className="relative md:px-20 text-center">
                <Swiper
                  modules={[Navigation, Autoplay, A11y]}
                  slidesPerView={1}
                  loop={true}
                  speed={500}
                  autoHeight={true}
                  navigation={{
                    nextEl: ".slide-next",
                    prevEl: ".slide-prev"
                  }}
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                >
                  {whatClientsSay.reviewsItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="text-center">
                        <div className="text-lg mb-4 bg-light/10 py-8 px-5 md:px-10 rounded-lg">{item.review}</div>
                        <p className="text-2xl font-medium mb-1">{item.name}</p>
                        <p className="text-black/75">{item.info}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className="slide-prev md:absolute px-3 md:px-0 mt-14 md:mt-0 left-0 top-1/2 -translate-y-1/2"
                  title="Slide Prev"
                >
                  <Image
                    className="inline-block invert rotate-180"
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </button>
                <button
                  className="slide-next md:absolute px-3 md:px-0 mt-14 md:mt-0 right-0 top-1/2 -translate-y-1/2"
                  title="Slide Next"
                >
                  <Image
                    className="inline-block invert"
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    height={31}
                    width={39}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default About;

// Export Props
export const getStaticProps = () => {
  const about = getSinglePage("content/about.md");

  return {
    props: {
      aboutPage: about,
    },
  };
};
