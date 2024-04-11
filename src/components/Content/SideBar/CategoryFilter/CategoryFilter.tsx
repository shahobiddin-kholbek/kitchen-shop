import { Cascader } from "antd";
import { useDispatch } from "react-redux";
import { setCategory } from "@/provider/redux";
import { CascaderOption } from "@/Types/types";
import { AppDispatch } from "@/provider/redux/store";

export default function CategoryFilter() {
  const dispatch = useDispatch<AppDispatch>();

  const categoryOptions: CascaderOption[] = [
    {
      value: "",
      label: "Все",
    },
    {
      value: "Стуля",
      label: "Стуля",
    },
    {
      value: "Ножи",
      label: "Ножи",
    },
    {
      value: "Столы",
      label: "Столы",
    },
    {
      value: "Ложки",
      label: "Ложки",
    },
    {
      value: "Чайники",
      label: "Чайники",
    },
  ];

  const onChangeCategory = (value: any) => {
    dispatch(setCategory(value[0]));
  };
  return (
    <>
      <h1>Категории</h1>
      <Cascader
        options={categoryOptions}
        defaultValue={["Все"]}
        onChange={onChangeCategory}
      />
    </>
  );
}
