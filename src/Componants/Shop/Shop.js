import React, { createContext, useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import NavBar from '../NavBar/NavBar';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
import { Link } from 'react-router-dom';
import LoadingText from '../LoadingText/LoadingText';
import noDataFound from '../../images/noDataFound.png';
import Footer from '../Footer/Footer';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = event => {
        setSearch(event.target.value);
    }
    // all products load form database
    useEffect(() => {
        fetch('http://localhost:5000/products?search=' + search)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [search])

    //load data form sesion storage
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        // load all products using keys
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(response => response.json())
            .then(data => setCart(data))
        // setCart(previousCart) error here . eita dile erroer aste
    }, [])


    const handleAddProduct = ({ product }) => {
        // console.log(product.key)
        const newCart = [...cart, product];
        setCart(newCart); // update cart to new
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="container">
            
            <NavBar handleSearch={handleSearch} cart={cart.length}></NavBar>
            <div className="mt-5 pt-4">
            <div class="alert alert-dismissible text-light fade show p-3 bg-info" role="alert">
                    <strong>Yeah Huu!</strong> If Your shipping <strong>Greater  250</strong> then charge is half. And if <strong> Greater  500</strong> charge totally free..Haha
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            {/* <h1 className="text-center sticky-top bg-primary text-light">Cart Items:  {cart.length}</h1> */}
            <div className="row mr-0">
                <div className="col-md-8">
                    {
                        products.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddProduct={handleAddProduct}
                        ></Product>)
                    }
                    {
                        products.length === 0 && <LoadingText></LoadingText>
                    }

                    {/* ============== If no data found show this message ================= */}
                    {
                        products.length === 0 && <div>
                            <img className="img-fluid" style={{ marginTop: '-24%', backgroundColor: '#000' }} src={noDataFound} alt="noDataFound" />
                        </div>
                    }
                </div>
                <div className="col-md-4 my-5">
                    <Cart cart={cart}>
                        <Link to="/reviewOrder"><button className="btn btn-info btn-lg text-light btn-block"><h5>Review Your Order</h5></button></Link>
                    </Cart>
                </div>
            </div>
            {
                products.length === 0 && <Footer></Footer>
            }
        </div>
    );
};

export default Shop;