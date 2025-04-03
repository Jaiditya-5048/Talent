import { CardData } from '../utils/types';

interface ProductCardProps {
  CardData: CardData; // Expect `CardData` as a prop
}

const ProductCard: React.FC<ProductCardProps> = ({ CardData }) => {
  return (
    <div className=' p-4 w-full'>
      <div className='  pl-2 pb-3 hover:shadow-lg bg-white rounded-md'>
        <div className='h-48 rounded overflow-hidden'>
          <img
            alt='ecommerce'
            className=' object-center object-contain w-full h-full'
            src={CardData.thumbnail}
          />
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
