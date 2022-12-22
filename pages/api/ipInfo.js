// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getIpInfo from '../../config/ipLookup';

export default async function handler(req, res) {
      const ipInfoObj = await getIpInfo('198.16.66.141');
      res.status(200).json(ipInfoObj);
}
