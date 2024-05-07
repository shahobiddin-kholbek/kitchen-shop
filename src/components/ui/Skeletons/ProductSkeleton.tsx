import React from "react"
import ContentLoader from "react-content-loader"

const ProductSkeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={255}
    height={355}
    viewBox="0 0 255 355"
    backgroundColor="#f3f3f3"
    foregroundColor="#f0eaea"
    {...props}
  >
    <rect x="35" y="26" rx="0" ry="0" width="192" height="192" /> 
    <rect x="25" y="236" rx="0" ry="0" width="211" height="46" /> 
    <rect x="25" y="309" rx="4" ry="4" width="85" height="21" /> 
    <rect x="120" y="302" rx="8" ry="8" width="115" height="32" />
  </ContentLoader>
)

export default ProductSkeleton