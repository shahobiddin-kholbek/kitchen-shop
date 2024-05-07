import { useDispatch } from "react-redux";
import { setSortByPrice } from "@/provider/redux";
import { Cascader } from "antd";
import React from "react";
import { CascaderOption } from "@/Types/types";
import { useTranslations } from "next-intl";

const Sorting: React.FC = () => {
  const t = useTranslations("sidebar");
  const dispatch = useDispatch();

  const sortOptions: CascaderOption[] = [
    {
      value: "",
      label: t("sortingOptions.default"),
    },
    {
      value: "DESC",
      label: t("sortingOptions.asc"),
    },
    {
      value: "ASC",
      label: t("sortingOptions.desc"),
    },
  ];

  const onChangeSort = (value: any) => {
    dispatch(setSortByPrice(value[0]));
  };

  return (
    <>
      <h1>{t("sorting")}</h1>
      <Cascader
        options={sortOptions}
        defaultValue={[t("sortingOptions.default")]}
        onChange={onChangeSort}
      />{" "}
    </>
  );
};

export default Sorting;
