// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getIpInfo from '../../config/ipLookup';

export default async function handler(req, res) {
      const remoteIP =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const ipInfoObj = await getIpInfo(remoteIP);
      res.status(200).json(ipInfoObj);
}
