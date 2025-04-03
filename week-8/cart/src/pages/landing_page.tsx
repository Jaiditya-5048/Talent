import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductData } from '../utils/api';
import { CardData, ApiResponseProductData } from '../utils/types';
import Nav from '../components/nav';
import ProductCard from '../components/product_card';
import Footer from '../components/footer';
import '../styles/Landing.css'
import Cart from '../components/Cart';

function LandingPage() {
  const [cardData, setCardData] = useState<CardData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const data: ApiResponseProductData | null = await getProductData();
       setCardData(data !== null ? data.products : []);
     } catch (error) {
       console.error('Error fetching data:', error);
       setCardData([]);
     } finally {
       setIsLoading(false);
     }
   };

   fetchData();
 }, []);

 

  return (
    <>
      <Nav />
      {/* <Cart /> */}
      {isLoading ? (
       
        <div className='flex justify-center items-center h-screen'>
          <p className='text-lg font-semibold'>Loading...</p>
        </div>
      ) : (
      
        <div>
          <section className='text-gray-600 body-font'>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-wrap p-2'>
                {cardData && cardData.length > 0 ? (
                  cardData.map((item) => (
                    <Link
                      to={`/product/${item.id}`}
                      state={{ product: item }}
                      key={item.id}
                      className='w-full lg:w-1/4 md:w-1/2 p-2'
                    >
                      <ProductCard CardData={item} />
                    </Link>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
}

export default LandingPage;
