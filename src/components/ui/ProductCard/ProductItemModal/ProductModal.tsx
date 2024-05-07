import { ProductModalProps } from '@/Types/types';
import { Tag, Typography, Carousel, Button } from 'antd';
import React, { useState } from 'react';
import './product_item_modal.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Rate } from "antd";
import { useTranslations } from 'next-intl';

export default function ProductModal({ AddToCart, product, IsItemOnCard, handleRemoveFromCart }: ProductModalProps) {
    const t = useTranslations("productCard")
    const [currentSlide, setCurrentSlide] = useState(0);
    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide);
    };

    const Arrow = ({ type, onClick }: { type: 'left' | 'right', onClick: () => void }) => {
        const icon = type === 'left' ? <LeftOutlined /> : <RightOutlined />;
        const className = `arrow-wrapper arrow-wrapper-${type}`;
        return (
            <div className={className} onClick={onClick}>
                {icon}
            </div>
        );
    };

    const rating = Number(product.rating)

    return (
        <div className="product-modal-content  h-[60vh] mb-10">
            <Carousel
                arrows
                prevArrow={<Arrow type="left" onClick={() => setCurrentSlide(currentSlide - 1)} />}
                nextArrow={<Arrow type="right" onClick={() => setCurrentSlide(currentSlide + 1)} />}
                afterChange={onChange}>
                {product.img.map((imgSrc, index) => (
                    <div key={index}>
                        <img
                            draggable="false"
                            className="product-modal-image"
                            src={imgSrc}
                            alt={product.name}
                        />
                    </div>
                ))}
            </Carousel>
            <div className="product-modal-info">
                <Typography.Title level={3} className="product-modal-title dark:text-white">{product.name}</Typography.Title>
                <Tag className="text-[20px] p-[5px] text-[green] w-[150px]">{t("price")}: {product.price}$</Tag>
                <Rate disabled defaultValue={rating} />
                <Typography.Text className="dark:text-white">{t("category")}: {product.category}</Typography.Text>
                <Typography.Paragraph className="product-modal-description dark:text-white">{t("description")}: {product.description}</Typography.Paragraph>
                {IsItemOnCard(product.id) ? (
                    <button
                        className='text-white bg-[red] w-[203px] p-[5px] rounded-md hover:opacity-80'
                        onClick={() => handleRemoveFromCart(product.id)}>{t("removeFromCart")}</button>
                ) : (
                    <button
                        className='text-white bg-[green] w-[203px] p-[5px] rounded-md hover:opacity-80'
                        onClick={() => AddToCart(product)}>{t("addToCart")}
                    </button>
                )}
            </div>
        </div>
    )
}
