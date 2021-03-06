"use strict";

const Homey = require('homey');
const miio = require('miio');

class GatewayDriver extends Homey.Driver {

    onPair(socket) {
        socket.on('testConnection', function(data, callback) {
            miio.device({
                    address: data.address,
                    token: data.token
                }).then(device => {
                    const getData = async () => {
                        try {
                            const lightLevel = await device.illuminance();

                            let result = {
                                lux: lightLevel.lux
                            }

                            callback(null, result);
                        } catch (error) {
                            callback(error, null);
                        }
                    }
                    getData();
                }).catch(function (error) {
                    callback(error, null);
                });
            });
    }

}

module.exports = GatewayDriver;
