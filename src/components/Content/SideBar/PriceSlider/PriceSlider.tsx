import { Slider, Space } from "antd";
import { setMinPrice, setMaxPrice } from "@/provider/redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";
import { useTranslations } from "next-intl";


export default function PriceSlider() {
  const t = useTranslations('sidebar');

  const dispatch = useDispatch<AppDispatch>()
  const { minPrice, maxPrice } = useSelector((state: RootState) => state.filters);

  const IntegerStep = () => {
    const onChange = (value: number[]) => {
      dispatch(setMinPrice(value[0]))
      dispatch(setMaxPrice(value[1]))
    };
    return (
      <div>
        <span className="text-[1.2rem]">{t('from')} {minPrice}$</span>
        <Slider
          style={{ width: '100%' }}
          className=" dark:bg-slate-800"
          max={2000}
          range={{
            draggableTrack: true,

          }}
          defaultValue={[0, 2000]}
          onChange={onChange}
          step={5}
          included={false}
        />
        <span className="text-[1.2rem]">{t('to')} {maxPrice}$</span>
      </div>


    );
  };
  return (
    <Space
      style={{
        width: "100%",
      }}
      direction="vertical"
    >
      <h1>{t('price')}</h1>
      {IntegerStep()}
    </Space>
  )
}
