import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <main className='bg-gray-900 h-screen grid grid-cols-1 lg:grid-cols-2'>
        <section className='lg:mx-10 mx-4'>
          <h1 className='text-6xl text-gray-400'>3D</h1>
          <nav className='grid grid-cols-2 mt-4'>
            <Link href='/organism'>
              <a className='card grow'>Organism</a>
            </Link>
            <Link href='/lotus'>
              <a className='card grow'>Lotus</a>
            </Link>
          </nav>
        </section>
        <section className='lg:mx-10 mx-4'>
          <h1 className='text-6xl text-gray-400'>2D</h1>
          <nav className='grid grid-cols-2 mt-4'>
            <Link href='/sandstone'>
              <a className='card grow'>Sandstone 1</a>
            </Link>
            <Link href='/yarn'>
              <a className='card grow'>Yarn</a>
            </Link>
            <Link href='/roots'>
              <a className='card grow'>Roots</a>
            </Link>
            <Link href='/treebeard'>
              <a className='card grow'>Treebeard</a>
            </Link>
            <Link href='/waves'>
              <a className='card grow'>Waves</a>
            </Link>
          </nav>
        </section>
        <footer className='mb-1 center-children absolute inset-x-0 bottom-0'>
          <span className='text-gray-600 text-sm align-middle'>
            made by{' '}
            <a
              className='text-gray-600 text-sm hover:text-gray-200 mr-1'
              href='https://elipleaner.com'>
              eli
            </a>{' '}
            🐙
          </span>
        </footer>
      </main>
    </>
  );
};

export default Index;
