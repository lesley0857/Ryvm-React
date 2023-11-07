import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";



class ProductsPage extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <>
                Products
                <nav>
                    <NavLink to='new_prroducts'>New Products</NavLink>
                    <NavLink to='old_products'>Old Products</NavLink>
                </nav>
                <Outlet></Outlet>
            </>
        )

    }
}
export default ProductsPage