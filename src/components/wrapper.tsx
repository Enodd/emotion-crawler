import React from 'react';
import { appWithTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyApp: React.FC<any> = ({ Component, pageProps }) => (
	<Component {...pageProps} />
);

export default appWithTranslation(MyApp);