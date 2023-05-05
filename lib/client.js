import {createClient} from '@sanity/client'


export const client = createClient({
    projectId: 'zoresqis',
    dataset: 'production',
    apiVersion: '2023-02-15',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_TOKEN
})