
import Cart from '../components/Cart'
import Footer from '../components/footer'
import Nav from '../components/nav'

function Cart_page() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Nav />
        <div className='flex-grow p-4'>
          <Cart />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Cart_page
