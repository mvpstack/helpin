const NodeGeocoder = require('node-geocoder');
const fs = require('fs');
const path = require('path');
const { Reader } = require('@maxmind/geoip2-node');

const getIpInfo = async (ip) => {
      const ipDataDirectory = path.join(process.cwd(), 'ipData');
      const asnDB = fs.readFileSync(`${ipDataDirectory}/asn.mmdb`);
      const cityDB = fs.readFileSync(`${ipDataDirectory}/city.mmdb`);

      const asnReader = Reader.openBuffer(asnDB);
      const cityReader = Reader.openBuffer(cityDB);

      const { autonomousSystemNumber, autonomousSystemOrganization, network } =
            asnReader.asn(ip);
      // const country = countryReader.country(ip)
      const { city, location, traits } = cityReader.city(ip);

      const geocoder = NodeGeocoder({ provider: 'teleport' });
      const addre = await geocoder.reverse({
            lat: location.latitude,
            lon: location.longitude,
      });
      addre[0].extra = undefined;
      addre[0].provider = undefined;
      const ipInfo = {
            ip,
            ...addre[0],
      };

      ipInfo.timeZone =
            location.timeZone !== undefined ? location.timeZone : '';
      if (autonomousSystemNumber !== undefined) {
            ipInfo.asn = {
                  asn: `AS${autonomousSystemNumber}`,
                  name: autonomousSystemOrganization,
                  route: network,
                  type: 'isp',
            };
      }
      if (autonomousSystemOrganization !== undefined)
            ipInfo.company = autonomousSystemOrganization;
      if (traits !== undefined) {
            ipInfo.privacy = {
                  vpn: traits.isAnonymousVpn,
                  proxy: traits.isPublicProxy,
                  tor: traits.isTorExitNode,
                  hosting: traits.isHostingProvider,
            };
      }

      return ipInfo;
};

module.exports = getIpInfo;
