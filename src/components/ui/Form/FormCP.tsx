'use client'
import { Button } from "antd";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from '../../ui/Form/form_ui.module.scss';

interface Product {
  name: string;
  price: number;
  description: string;
  img: string[];
  category: string;
}

interface Errors {
  name?: string;
  price?: string;
  description?: string;
  img?: string;
  category?: string;
}

interface Props {
  handleAddProduct: (e: FormEvent<HTMLFormElement>) => void;
  product: Product;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Errors;
  setProduct: any;
  setErrors: any;
}

const FormCP: React.FC<Props> = ({ handleAddProduct, product, handleChange, errors, setProduct, setErrors }) => {
  const [imgPreview, setImgPreview] = useState<string[] | []>([]);
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);

  const categoryOptions = ["Столы", "Стуля", "Ножи", "Ложки", "Другое"];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "Другое") {
      setShowCustomCategoryInput(true);
    } else {
      setShowCustomCategoryInput(false);
      handleChange(e);
    }
  };

  const handleCustomCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const handleImgChange = (e: any) => {
    const files = e.target.files;
    console.log(typeof files);
    
    if (files) {
      
      const imgPreviewArray: string[] = [];
      const imgDataArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            imgPreviewArray.push(reader.result);
            imgDataArray.push(reader.result);
            setImgPreview(imgPreviewArray);
            setProduct({ ...product, img: [...imgDataArray] });
            setErrors({ ...errors, img: '' });
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form className={`${styles.formAddProduct} dark:text-white w-[350px]`} onSubmit={handleAddProduct}>
      <label htmlFor="name">
        Name:{" "}
        <input
          id="name"
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <br />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
      </label>
      <label htmlFor="price">
        Price:{" "}
        <input
          id="price"
          type="number"
          name="price"
          value={product.price.toString()}
          onChange={handleChange}
        />
        <br />
        {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}
      </label>
      <label htmlFor="description">
        Description:{" "}
        <input
          id="description"
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <br />
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description}</span>
        )}
      </label>
      <label htmlFor="img">
        Img:{" "}
        <input
          id="img"
          type="file"
          name="img"
          onChange={handleImgChange}
          multiple
        />
        <br />
        {errors.img && <span style={{ color: "red" }}>{errors.img}</span>}
        <ul className="flex">
          {imgPreview && imgPreview.map((preview: string, i: number) => (
            <li key={i} className={i >= 0 ? "mr-[-33.33%] w-[100%]" : ""} >
              <img src={preview} alt={`Uploaded`} style={{ maxWidth: "50px", maxHeight: "50px" }} />
            </li>
          ))}
        </ul>
      </label>
      <label htmlFor="category">
        Category:{" "}
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />
        {errors.category && (
          <span style={{ color: "red" }}>{errors.category}</span>
        )}
      </label>
      {showCustomCategoryInput && (
        <label htmlFor="customCategory">
          <input
            id="customCategory"
            type="text"
            name="category"
            value={product.category}
            onChange={handleCustomCategoryChange}
          />
          <br />
        </label>
      )}
      <button className="border-2 hover:opacity-80 font-bold py-2 px-4 rounded" type="submit">
        Add
      </button>{" "}
    </form>
  );
}


export default FormCP;
