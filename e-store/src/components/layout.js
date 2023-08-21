import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HomeIcon, CartIcon } from './icons'
import Search from './search'

const Layout = ({categories}) => {
    const renderCategories = () => {
        return (
            categories.data.map(c =>
                <li key={c.id}><Link to={`/categories/${c.id}`}>{c.title}</Link></li>
            )
        );
    };

    return (
        <>
            <header>
                <div id='headerHomeIcon'>
                   <Link to="/"> <HomeIcon width={40}/></Link>
                </div>
                <Search/>
                <div id='headerTitle'>
                    Shopping.com
                </div>
                <div id='headerCartIcon'>
                   <Link to="/basket"> <CartIcon width={40}/></Link>
                </div>
            </header>
            <section>
                <nav>
                    {categories.errorMessage && <div>{categories.errorMessage}</div>}
                    <ul>{categories.data && renderCategories()}</ul>
                </nav>
                <main>
                    <Outlet />
                    {/* This Route will be rendered here */}
                </main>
            </section>
            <footer><Link to="/">Home</Link> | <Link to="/basket">Basket</Link></footer>
        </>
    )
}

export default Layout
