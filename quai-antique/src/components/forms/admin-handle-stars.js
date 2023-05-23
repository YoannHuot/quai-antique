import CardAdmin from "../cards/card-admin";
import React, { useRef, useState, useEffect } from "react";
import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import CardProductStar from "../cards/card-product-star";


const AdminHandleStars = ({ products, productsStars, setRefresh, refresh }) => {
    const deviceType = useDeviceType();

    return (
        <div className="flex flex-col justify-center items-center mb-12">

            <div className="grid md:grid-cols-2 grid-cols-1  gap-4 md:gap-8 w-full mb-4 md:mb-8">
                {_.map(_.first(productsStars, productsStars.length - 1), (content, index) => {
                    return (
                        <CardProductStar
                            products={products}
                            key={index}
                            index={index}
                            productStar={content}
                            setRefresh={setRefresh}
                            refresh={refresh}
                        />
                    );
                })}
            </div>

            <div className="md:w-1/2 w-full">
                <CardProductStar
                    products={products}
                    key={productsStars.length}
                    productStar={productsStars[productsStars.length - 1]}
                    index={productsStars.length - 1}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            </div>


        </div>
    );
};

export default AdminHandleStars;
