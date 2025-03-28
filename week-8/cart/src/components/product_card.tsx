import { CardData } from '../utils/types';

interface ProductCardProps {
  CardData: CardData; // Expect `CardData` as a prop
}

// const ProductCard: React.FC<ProductCardProps> = ({ CardData }) => {
//   return (
//     <section className='text-gray-400 bg-gray-900 body-font'>
//       <div className='container px-5 py-24 mx-auto'>
//         <div className='flex flex-wrap -m-4'>
//           <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
//             <a className='block relative h-48 rounded overflow-hidden'>
//               <img
//                 alt='ecommerce'
//                 className='object-cover object-center w-full h-full block'
//                 src='https://dummyimage.com/420x260'
//               />
//             </a>
//             <div className='mt-4'>
//               <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
//                 {CardData.category}
//               </h3>
//               <h2 className='text-white title-font text-lg font-medium'>{CardData.name}</h2>
//               <p className='mt-1'>{CardData.price}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
const ProductCard: React.FC<ProductCardProps> = ({ CardData }) => {
  return (
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
      <div className='  pl-2 pb-3 hover:shadow-lg bg-white rounded-md'>
        <div className='flex justify-center relative h-48 rounded overflow-hidden'>
          <img alt='ecommerce' className=' block h-48 w-auto ' src={CardData.thumbnail} />
        </div>
        <div className='mt-4'>
          <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
            {CardData.category}
          </h3>
          <h2 className='text-gray-900 title-font text-lg font-medium'>{CardData.title}</h2>
          <p className='mt-1'>${CardData.price}</p>
        </div>
      </div>
    </div>
  );
 
};

export default ProductCard;
