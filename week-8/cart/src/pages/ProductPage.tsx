import { useLocation } from 'react-router-dom'; //useParams
import { useState   } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { CardData } from '../utils/types';
import { useCart } from '../components/CartContext';


function ProductPage() {
  // const [imageData, setImageData] = useState<ImageData[] | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data: ApiResponseProductData | null = await getProductData();
  //       setImageData(data !== null ? data.products : []);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setCardData([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [imageLoaded, setImageLoaded] = useState(false);

  const {cart, addToCart, addQuantity, subtractQuantity } = useCart();

  // const { id } = useParams();           // Get product ID from URL
  const location = useLocation();
  const product: CardData | undefined = location.state?.product; // Retrieve passed data

  

  if (!product) {
    return <p>Product not found</p>; // Handle case where data isn't passed
  }
  return (
    <>
      <Nav />
      <section className='text-gray-600 body-font overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-wrap'>
            {/* ✅ Image Wrapper */}
            <div className='relative lg:w-1/2 w-full lg:h-auto h-64'>
              {/* 🔵 Loader (Shows until image loads) */}
              {!imageLoaded && (
                <div className='absolute inset-0 flex justify-center items-center bg-gray-200'>
                  <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500'></div>
                </div>
              )}

              <img
                alt='ecommerce'
                className={`object-cover object-center rounded transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                src={product.images[0]}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)} // In case of error, remove loader
              />
            </div>

            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>{product.brand}</h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {product.title}
              </h1>
              <div className='flex mb-4'>
                <span className='flex items-center'>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-indigo-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-indigo-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-indigo-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-indigo-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-4 h-4 text-indigo-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <span className='text-gray-600 ml-3'>{product.reviews.length} Reviews</span>
                </span>
              </div>
              <p className='leading-relaxed border-b-2 border-gray-300 pb-5'>
                {product.description}
              </p>

              <div className='flex mt-10'>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  ${product.price}
                </span>
                {cart.find((item) => item.id === product.id) === undefined ? (
                  <button
                    className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className='flex ml-auto'>
                    <form className='max-w-xs mx-auto'>
                      <div className='relative flex items-center max-w-[8rem]'>
                        <button
                          onClick={() => subtractQuantity(product)}
                          type='button'
                          id='decrement-button'
                          data-input-counter-decrement='quantity-input'
                          className='bg-gray-100 hover:bg-gray-500 rounded-s-lg p-3 h-11 focus:outline-none'
                        >
                          <svg
                            className='w-3 h-3 text-gray-900'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 18 2'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M1 1h16'
                            />
                          </svg>
                        </button>
                        <input
                          type='text'
                          value={cart.find((item) => item.id === product.id)?.quantity}
                          id='quantity-input'
                          data-input-counter
                          aria-describedby='helper-text-explanation'
                          className='bg-gray-100 h-11 text-center text-gray-900 text-sm focus:outline-0 block w-full py-2.5'
                          placeholder=''
                          disabled
                        />
                        <button
                          onClick={() => addQuantity(product)}
                          type='button'
                          id='increment-button'
                          data-input-counter-increment='quantity-input'
                          className='bg-gray-100 hover:bg-gray-500  rounded-e-lg p-3 h-11  focus:outline-none'
                        >
                          <svg
                            className='w-3 h-3 text-gray-900 '
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 18 18'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 1v16M1 9h16'
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductPage;
