import RiderLogin from '@/components/UI/riderLogin';
import React from 'react';
import { client } from '../../../sanity/lib/client';

async function Page() {
  const riders = await client.fetch(`*[_type == "rider"]{
    riderId,
    name,
    "riderBlock": Area->block // Map 'block' to 'riderBlock'
  }`);

  return (
    <div>
      <RiderLogin rider={riders} />
    </div>
  );
}

export default Page;
