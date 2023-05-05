import GlobalContext from '@/context/GlobalContext';
import { client } from '@/lib/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useContext, useEffect, useState } from 'react'

export const useCleaningFunction = () => {

    const {onCleaningClient, setOnCleaningClient } = useContext(GlobalContext)

    const onCleaningQuery = '*[_type == "onCleaning"] | order(title asc)';

    useEffect(() => {
    async function getOnCleaning() {
      const res = await client.fetch(onCleaningQuery)
      setOnCleaningClient(res)
    }
    getOnCleaning();
  }, [setOnCleaningClient])

   return { onCleaningClient }
  }