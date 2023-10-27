'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { PaginationContainer } from './styled';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginatinationControls:React.FC<PaginationControlsProps> = ({ 
  hasNextPage,
  hasPrevPage
}) => {
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams?.get('page') ?? '1'
  const per_page = searchParams?.get('per_page') ?? '5'

  return (
    <PaginationContainer>
      <button 
        style={{ cursor: 'pointer' }}
        disabled={!hasPrevPage}
        role='button'
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}
      >
        prev page
      </button>
      <select 
        role='contentinfo'
        name="itemsPerPage" 
        id="itemsPerPage"
        disabled
        onChange={(event: any) => {}}
      >
        <option value="5">5</option>
      </select>
      <button
        role='button'
        style={{ cursor: 'pointer' }}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}
      >
        next page
      </button>
    </PaginationContainer>
  )
}

export default PaginatinationControls