import { ProductModalProps } from '@/Types/types';
import { Modal, Tag, Typography, Carousel, Button } from 'antd';
import React, { useState } from 'react';
import './product_item_modal.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export default function ProductModal({ AddToCart, product, isModalVisible, handleCancel, IsItemOnCard, handleRemoveFromCart }: ProductModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide);
    };

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
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

    return (
        <Modal
            title={product.name}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered={true}
        >
            <div className="product-modal-content">
                <Carousel
                    arrows
                    prevArrow={<Arrow type="left" onClick={() => setCurrentSlide(currentSlide - 1)} />}
                    nextArrow={<Arrow type="right" onClick={() => setCurrentSlide(currentSlide + 1)} />}
                    afterChange={onChange}>
                    {product.img.map((imgSrc, index) => (
                        <div key={index} style={contentStyle}>
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
                    <Tag className="text-sm text-[green]">Цена: {product.price}$</Tag>
                    <Typography.Text className="product-modal-category">Категория: {product.category}</Typography.Text>
                    {IsItemOnCard(product.id) ? ( // Проверяем, есть ли продукт в корзине
                        <Button
                            style={{ color: "red", width: '103px' }}
                            onClick={() => handleRemoveFromCart(product.id)}>Remove</Button>
                    ) : (
                        <Button
                            style={{ color: "green", width: '103px' }}
                            onClick={() => AddToCart(product)}>Add to Cart</Button>
                    )}
                </div>
                <Typography.Paragraph className="product-modal-description">Описание: {product.description}</Typography.Paragraph>
            </div>
        </Modal>
    )
}
