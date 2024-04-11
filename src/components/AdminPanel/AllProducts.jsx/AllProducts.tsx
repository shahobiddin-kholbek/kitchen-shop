import { Button, message, Tag, Typography } from "antd";
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "@/provider/redux/apies/productsApi";
import { useEffect, useState } from "react";
import { UpdatedProductData } from "@/Types/types";
import '../../ui/ProductCard/product_card.css'

export default function AllProducts(): JSX.Element {
  const [imgPreview, setImgPreview] = useState<string[] | []>([]);
  const { data: products = [], isLoading } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isError: updateProductIsError, error, isSuccess: updateProductSuccess }] = useUpdateProductMutation();
  const [updateProductId, setUpdateProductId] = useState<string | null>('');
  const [updatedProductData, setUpdatedProductData] = useState<UpdatedProductData>({
    name: "",
    price: 0,
    description: "",
    img: [],
    category: "",
  });

  useEffect(() => {
    if (updateProductSuccess) {
      message.success('Продукт успешно обновлён!')
    } else if (updateProductIsError) {
      message.error('Продукт не был обновлён!')
    }
   }, [updateProductSuccess]);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Product delete successfully!');

    } catch (error) {
      message.error('Product delete rejected!');
    }
  };

  const handleUpdateProduct = (id: string) => {
    setUpdateProductId(id);
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate && productToUpdate.img && productToUpdate.img.length > 0) {
      setUpdatedProductData({
        name: productToUpdate.name,
        price: productToUpdate.price,
        description: productToUpdate.description,
        img: productToUpdate.img,
        category: productToUpdate.category,
      });
      setImgPreview(productToUpdate.img);
    }

  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProductId && updatedProductData) {
      await updateProduct({ id: updateProductId, ...updatedProductData });
      setUpdateProductId(null);
      setUpdatedProductData({ name: "", price: 0, description: "", img: [], category: "" });
    }
  };

  const handleImgChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      for (const file of files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            previews.push(reader.result);
            if (previews.length === files.length) {
              setImgPreview(previews);
              setUpdatedProductData((prevData) => ({
                ...prevData,
                img: previews,
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "img" && e.target.files && e.target.files.length > 0) {
      handleImgChange(e);
    } else {
      setUpdatedProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {isLoading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      {(updateProductIsError && error !== undefined) &&
        (<h1 className="text-red-500 text-lg">
          {((error as any).status >= 400 && (error as any).status <= 499)
            ? `'Invalid data!'`
            : (((error as any).status >= 500 && (error as any).status <= 599)
              ? 'Server error!'
              : 'Some error occurred!')
          }
        </h1>)}

      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id} className="border p-4 w-[270px]">
            {updateProductId === product.id.toString() ? (
              <form className="border-0 p-0" onSubmit={handleFormSubmit}>
                <label className="block mb-2">
                  Name
                  <input
                    className="border border-gray-300 p-2 w-full"
                    id="name"
                    required
                    type="text"
                    name="name"
                    value={updatedProductData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                  />
                </label>
                <label className="block mb-2">
                  Price
                  <input
                    className="border border-gray-300 p-2 w-full"
                    id="price"
                    required
                    type="number"
                    name="price"
                    value={updatedProductData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                  />
                </label>
                <label className="block mb-2">
                  Description
                  <input
                    className="border border-gray-300 p-2 w-full"
                    id="description"
                    required
                    type="text"
                    name="description"
                    value={updatedProductData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </label>
                <label className="block mb-2">
                  Img
                  <input
                    className="border border-gray-300 p-2 w-full"
                    id="img"
                    required={imgPreview.length === 0 ? true : false}
                    type="file"
                    name="img"
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    multiple
                  />
                  <ul className="flex">
                    {imgPreview && imgPreview.map((preview: string, i: number) => (
                      <li key={i} className={i >= 0 ? "mr-[-33.33%] w-[100%]" : ""} >
                        <img src={preview} alt={`Uploaded`} style={{ maxWidth: "50px", maxHeight: "50px" }} />
                      </li>
                    ))}
                  </ul>

                </label>
                <label className="block mb-2">
                  Category
                  <input
                    className="border border-gray-300 p-2 w-full"
                    id="category"
                    required
                    type="text"
                    name="category"
                    value={updatedProductData.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                  />
                </label>
                <div className="flex justify-between">
                  <Button style={{ width: "45%" }} htmlType="submit">
                    Save
                  </Button>
                  <Button
                    style={{ width: "45%" }}
                    htmlType="button"
                    onClick={() => setUpdateProductId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <Typography.Title level={3}>{product.name}</Typography.Title>
                {product && product.img && product.img[0] && (
                  <img
                    draggable="false"
                    className="w-48 h-48 object-cover"
                    src={product.img[0]}
                    alt={product.name}
                  />
                )}
                <Tag
                  color="green"
                  className="text-lg mb-2"
                >
                  Price: {product.price}
                </Tag>{" "}
                <Typography.Paragraph>
                  {product.description}
                </Typography.Paragraph>
                <div className="flex justify-between">
                  <Button
                    danger
                    style={{ width: "45%" }}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ width: "45%" }}
                    onClick={() => handleUpdateProduct(product.id)}
                  >
                    Update
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
