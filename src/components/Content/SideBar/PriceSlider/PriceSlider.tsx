import { Col, Row, Slider, Space } from "antd";
import { setMinPrice, setMaxPrice } from "@/provider/redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";


export default function PriceSlider() {
    const dispatch = useDispatch<AppDispatch>()
  const { minPrice, maxPrice } = useSelector((state: RootState) => state.filters);

const IntegerStep = () => {
    const onChange = (value: number[]) => {
      dispatch(setMinPrice(value[0]))
      dispatch(setMaxPrice(value[1]))
    };
    return (
      <Row>
        <Col span={12}>
          <span className="text-[1.2rem]">от {minPrice}$</span>
          <Slider
            style={{ width: '250px' }}
            max={2000}
            range={{
              draggableTrack: true,

            }}
            defaultValue={[0, 2000]}
            onChange={onChange}
            step={5}
            included={false}
          />
          <span className="text-[1.2rem]">до {maxPrice}$</span>
        </Col>
      </Row>
    );
  };
  return (
    <Space
        style={{
          width: "100%",
        }}
        direction="vertical"
      >
        <h1>Цены:</h1>
        {IntegerStep()}
      </Space>
  )
}
