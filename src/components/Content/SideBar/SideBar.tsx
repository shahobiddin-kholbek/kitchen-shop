import CategoryFilter from "./CategoryFilter/CategoryFilter";
import PriceSlider from "./PriceSlider/PriceSlider";
import Sorting from "./Sorting/Sorting";


// eslint-disable-next-line react/prop-types
export default function SideBarCP() {
  return (
    <>
      <PriceSlider />
      <CategoryFilter />
      <Sorting />
    </>
  );
}
