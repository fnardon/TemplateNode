module.exports = function(application,callback) {
    
      this.getConsentId = function(application,callback) {
         
        const fetch = require('node-fetch');
        var axios = require('axios');
        var qs = require('qs');
        var tenant_url = "gft.verify.ibm.com/v1.0";
        var client_id = "da6003dc-6610-4c29-b25a-3e970d41e0b9";
        var client_secret = "joBTJbo8OL";

        var data = {
                'grant_type': 'client_credentials',
                'client_id': client_id,
                'client_secret': client_secret,
                'scope': 'openid'
        };

        var request = {
                method: 'post',
                url: 'https://' + tenant_url + '/endpoint/default/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data)
        };

        axios(request).then((response) => {
                var tokenData = response.data;
                var access_token = tokenData.access_token;
                console.log(access_token);
                
                var data = JSON.stringify({
                        "isGlobal": true,
                        "subjectId": "string",
                        "purposeId": "prop-gft",
                        "state": 0,
                        "customAttributes": [
                                {
                                        "name": "string",
                                        "value": "string"
                                }
                        ],
                        "isExternalSubject": true
                });

                var config = {
                        method: 'post',
                        url: 'https://' + tenant_url + '/privacy/consents',
                        headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'Content-Type': 'application/json',
                                'Cookie': 'CISESSIONIDPR01A=PBC5YS:4212725780; CISESSIONIDPR01B=PBC5YS:560401121; ak_bmsc=2DFCFCFF9E30B7A89A6462929466F367C900DD3E042E000052B8C060EE6C2F1A~plZQQLP8aL7I4SsxgRAu9hk/Ar74OIBRcB4E7x7wwDcv7sfJgPGXIgPw2jA/uw3FMRoYVVmeMi5EOgl+6qX9Vcsh7a8CvTeLeoHaQRQyWxRwwLTgmnmj6XllOK/ogbjp+f5YrCs6d8En35jZANv6FA0g2sceA2uYW9/ujNHp0hRLstqAv79gDwGTVFQVAM01/hbgSmhPSwT32YaYpXb+MtIHu/n+ArvCHBLXh+BAHZs/8=; CIPD-S-SESSION-ID=1_2_0_m6hKNMkQDeEnsXtpaB-faY9DIvOIWzLyXPoFccMFCYQFsQPG; PD_STATEFUL_e6ff3e26-b2a1-11eb-b05d-000c29dfbe2b=%2Fui'
                        },
                        data: data
                };

                axios(config)
                        .then(function (response) {

                                var location = JSON.stringify(response.headers['location']);
                                var partes = location.split('/');
                                var posicaoConsentId = partes.length - 1;
                                var consentIdComAspas = partes[posicaoConsentId];
                                var consentId = consentIdComAspas.replace('"', '');

                                console.log(consentId);

                                return consentId;

                        })
                        .catch(function (error) {
                                console.log(error);
                        });

        }).catch((error) => {
                console.log(error);
        });

        res.render("verify/consents");

      }
    }
