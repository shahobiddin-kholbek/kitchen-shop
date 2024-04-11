"use client"
import { Tabs } from "antd";
import AddProduct from "./AddProduct.jsx/AddProduct";
import { TabItem } from "@/Types/types";
import AllProducts from "./AllProducts.jsx/AllProducts";

export default function AdminPanel() {
  const savedActiveTab = typeof window !== 'undefined' ? localStorage.getItem('activeTab') || '1' : '1';
  
  const onChange = (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("activeTab", key);
    }
  };

  const items: TabItem[] = [
    {
      key: "1",
      label: "Add",
      children: <AddProduct />,
    },
    {
      key: "2",
      label: "All Products",
      children: <AllProducts />,
    },
  ];

  return (
    <section className="flex justify-center">
      <Tabs defaultActiveKey={savedActiveTab} centered items={items} onChange={onChange} />
    </section>
  );
}

