"use client"
import React from 'react'
import { Carousel } from "antd";
import Image, { StaticImageData } from 'next/image';
import banner1 from '/public/img/banner/slider1.jpg'
import banner2 from '/public/img/banner/slider2.jpg'
import './banner.css'

type Banner = {
    id: number,
    img: StaticImageData,
    alt: string
}

const bannerItems: Banner[] = [
    {
        id: 1,
        img: banner1,
        alt: 'slider1'
    },
    {
        id: 2,
        img: banner2, 
        alt: 'slider2'
    }
]

export default function Banner() {

    return (
        <section className='banner mb-10'>
            <Carousel
                // autoplay
                autoplaySpeed={4000}
                draggable={false}
                pauseOnHover
            // afterChange={onChange}
            >
                {
                    bannerItems.map(item => (
                        <div key={item.id}>
                            <Image className='rounded-md' priority={true} src={item.img} alt={item.alt} />
                        </div>
                    ))
                }


            </Carousel>
        </section>
    )
}
