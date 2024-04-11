import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAddProductMutation } from "@/provider/redux/apies/productsApi";
import FormCP from "../../ui/Form/FormCP";
import { Product, Errors } from "@/Types/types";
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import '../../ui/Form/form_ui.css';

export default function AddProduct(): JSX.Element {
  const [addProduct, { isError, error, isSuccess, isLoading }] = useAddProductMutation();
  const [product, setProduct] = useState<Product>({
    id: uuidv4(),
    name: "",
    price: 0,
    description: "",
    rating: '1',
    img: [],
    category: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    price: "",
    description: "",
    rating: '',
    img: '',
    category: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    let newValue: string | number = value;
    if (name === "price") {
      const parsedValue = parseFloat(value);
      newValue = isNaN(parsedValue) ? "" : parsedValue;
    }
    setProduct({ ...product, [name]: newValue }); 
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!product.name.trim()) {
      newErrors.name = "Имя не сожет быть пустым!";
      isValid = false;
    }

    if (product.price <= 0) {
      newErrors.price = "Цена должна быть больше 0!";
      isValid = false;
    }

    if (!product.description.trim()) {
      newErrors.description = "Описание отсутствует!";
      isValid = false;
    }

    if (!product.img || product.img.length < 1) {
      newErrors.img = "Фото отсутсвует";
      isValid = false;
    }

    if (!product.category.trim()) {
      newErrors.category = "Категория долдна быть выбрана!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addProduct(product);
      } catch (err: any) {
        message.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Product added successfully');
      setProduct({
        ...product,
        name: "",
        price: 0,
        description: "",
        img: [],
        category: "",
      });
    } else if (isError) {
      console.log(JSON.stringify(error));
      message.error('Product addition failed');
    }
  }, [isSuccess, isError]);
  return (
    <>
      <div className="">
        {(isError && error !== undefined) &&
          (<h1 className="text-[red] text-[1.2rem]">
            {((error as any).status >= 400 && (error as any).status <= 499)
              ? `Неверно заполненные данные!`
              : (((error as any).status >= 500 && (error as any).status <= 599)
                ? `Статус ошибки: ${(error as any).status}! ${(error as any).data?.message}`
                : `Статус ошибки: ${(error as any).status} ${(error as any).data?.message}`)
            }
          </h1>)}
          {isLoading && (
            <h1>Loading...</h1>
          )}
      </div>
      <FormCP
        handleAddProduct={handleAddProduct}
        handleChange={handleChange}
        product={product}
        setErrors={setErrors}
        errors={errors}
        setProduct={setProduct}
      />

    </>

  );
}
