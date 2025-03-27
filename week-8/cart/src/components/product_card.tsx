import * as React from 'react'
// import PropTypes from 'prop-types'

type Card_data = {
  category: string,
  name: string,
  price: number,
}

function product_card(card_data: Card_data) {
  return (
    <section className='text-gray-400 bg-gray-900 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
            <a className='block relative h-48 rounded overflow-hidden'>
              <img
                alt='ecommerce'
                className='object-cover object-center w-full h-full block'
                src='https://dummyimage.com/420x260'
              />
            </a>
            <div className='mt-4'>
              <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>{card_data.category}</h3>
              <h2 className='text-white title-font text-lg font-medium'>{card_data.name}</h2>
              <p className='mt-1'>{card_data.price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

product_card.propTypes = {};

export default product_card;
