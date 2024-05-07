import { Cascader } from "antd";
import { useDispatch } from "react-redux";
import { setCategory } from "@/provider/redux";
import { CascaderOption } from "@/Types/types";
import { AppDispatch } from "@/provider/redux/store";
import { useTranslations } from "next-intl";

export default function CategoryFilter() {
  const t = useTranslations("sidebar");
  const dispatch = useDispatch<AppDispatch>();

  const categoryOptions: CascaderOption[] = [
    {
      value: "",
      label: t('categoryOptions.all'),
    },
    {
      value: "Стуля",
      label: t('categoryOptions.chairs'),
    },
    {
      value: "Ножи",
      label: t('categoryOptions.knives'),
    },
    {
      value: "Столы",
      label: t('categoryOptions.tables'),
    },
    {
      value: "Ложки",
      label: t('categoryOptions.spoons'),
    },
    {
      value: "Чайники",
      label: t('categoryOptions.teapots'),
    },
  ];

  const onChangeCategory: (value: object) => void = (value: any) => {
    dispatch(setCategory(value[0]));
    
  };
  return (
    <>
      <h1>{t("category")}</h1>
      <Cascader
        options={categoryOptions}
        defaultValue={[t('categoryOptions.all')]}
        onChange={onChangeCategory}
        style={{ colorScheme: 'dark' ? "#2d3748" : "color-black bg-white" }}
        />
    </>
  );
}
