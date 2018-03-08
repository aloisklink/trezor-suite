/* @flow */
'use strict';

import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default (props: any): any => {
    return (
        <div className="app connect-device">
            <Header />
            <main>
                <h2>The private bank in your hands.</h2>
                <p>TREZOR Wallet is an easy-to-use interface for your TREZOR.</p>
                <p>TREZOR Wallet allows you to easily control your funds, manage your balance and initiate transfers.</p>
                <div className="row">
                    <p className="connect">
                        <svg width="20px" height="57px" viewBox="0 0 20 57">
                            <g stroke="none" strokeWidth="1" fill="none" transform="translate(1, 1)">
                                <rect className="connect-usb-pin" fill="#01B757" x="6" y="39" width="6" height="5"></rect>
                                <rect className="connect-usb-cable" stroke="#01B757" strokeWidth="1" x="8.5" y="44.5" width="1" height="11"></rect>
                                <path stroke="#01B757" d="M8.90856859,33.9811778 L6.43814432,33.9811778 C5.45301486,34.0503113 4.69477081,33.6889084 4.1634122,32.8969691 C3.36637428,31.7090602 -0.000402169348,26.3761977 0.0748097911,23.2982514 C0.124878873,21.2492429 0.0999525141,14.5598149 3.07156595e-05,3.22996744 C-0.000274213164,3.1963928 0.00243636275,3.162859 0.00812115776,3.12976773 C0.28477346,1.51937083 1.22672004,0.617538852 2.8339609,0.424271782 C4.45813658,0.228968338 6.54411954,0.0875444105 9.09190977,0 L9.09190977,0.0169167084 C11.5566027,0.104886477 13.5814718,0.244169993 15.1665175,0.434768145 C16.7530267,0.625542287 17.6912941,1.50671985 17.9813196,3.07830083 C17.9943481,3.14889902 18.0005888,3.22058224 17.9999563,3.29236974 L17.9999901,3.29237004 C17.9004498,14.5907444 17.875676,21.2628703 17.9256686,23.3087478 C18.0008805,26.3866941 14.6341041,31.7195566 13.8370662,32.9074655 C13.3057075,33.6994047 12.5474635,34.0608076 11.562334,33.9916742 L8.90856859,33.9916742 L8.90856859,33.9811778 Z"></path>
                                <rect fill="#01B757" x="2" y="7" width="14" height="7" rx="0.5625"></rect>
                            </g>
                        </svg>
                        <span>Connect TREZOR to continue</span>
                    </p>
                    {/* <p>Don't have TREZOR? <a href="https://trezor.io/" target="_blank" rel="noreferrer noopener">Get one</a></p> */}
                </div>
                <div className="image"></div>
                <p>Don't have TREZOR? <a href="https://trezor.io/" className="green" target="_blank" rel="noreferrer noopener">Get one</a></p>
            </main>
            <Footer />
        </div>
    );
}