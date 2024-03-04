import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const NestedRoutesProduct = () => {
      // /products => read all products
      // /products/:id => detail page
      // /products/create => create products
      // /products/update/:Id => products update
      
  return (
    <div>
      <Routes>
            <Route 
            path="/"
            element={<Outlet></Outlet>}>
                  <Route index element={<div>Home page</div>}></Route>

                  <Route path="products" element={<Outlet></Outlet>}>
                        <Route index element={<div>Read all products</div>}></Route>
                        <Route path=":id" element={<div>detail page</div>}></Route>
                        <Route path="create" element={<div>create products</div>}></Route>
                  </Route>

                  <Route path="update" element={<Outlet></Outlet>}>
                              <Route index element={<div>Update page</div>}></Route>
                              <Route path=":id" element={<div>Products update page.</div>}></Route>
                  </Route>
                  
                  <Route path="*" element={<div>404: page not found</div>}></Route>
            </Route>
      </Routes>
      
    </div>
  )
}

export default NestedRoutesProduct