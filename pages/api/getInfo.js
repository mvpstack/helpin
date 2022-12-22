// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fetchInfo = async (remoteIP) => {
      const res = await fetch(`http://v2.api.iphub.info/ip/${remoteIP}`, {
            method: 'GET',
            headers: {
                  'X-Key': 'MTkwODg6emNCajJTUmxXb2paNjFicGRYaDdTRUswUWdrMG4wUk8=',
            },
      });
      const data = await res.json();
      return data;
};

export default async function handler(req, res) {
      try {
            const remoteIP =
                  req.headers['x-forwarded-for'] ||
                  req.connection.remoteAddress;
            if (remoteIP === '::1') {
                  res.status(200).json({});
            } else {
                  const result = await fetchInfo(remoteIP);
                  res.status(200).json(result);
            }
      } catch (err) {
            res.status(400).json(err);
      }
}
