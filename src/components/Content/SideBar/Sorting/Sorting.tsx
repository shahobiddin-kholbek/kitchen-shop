import { useDispatch } from "react-redux";
import { setSortByPrice } from "@/provider/redux";
import { Cascader } from "antd";
import React from "react";
import { CascaderOption } from "@/Types/types";



const Sorting: React.FC = () => {
  const dispatch = useDispatch();

  const sortOptions: CascaderOption[] = [
    {
      value: "",
      label: "По умолчанию...",
    },
    {
      value: "DESC",
      label: "По возрастанию",
    },
    {
      value: "ASC",
      label: "По убыванию",
    },
  ];

  const onChangeSort = (value: any) => {
    dispatch(setSortByPrice(value[0]));
  };

  return (
    <>
      <h1>Сортировка</h1>
      <Cascader
        options={sortOptions}
        defaultValue={["По умолчанию..."]}
        onChange={onChangeSort}
      />{" "}
    </>
  );
};

export default Sorting;
